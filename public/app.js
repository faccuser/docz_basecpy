// State Management
const State = {
    tutor: null,
    pets: [],
    currentPet: null,
    applications: []
};

// DOM Elements
const screens = {
    login: document.getElementById('screen-login'),
    dashboard: document.getElementById('screen-dashboard'),
    details: document.getElementById('screen-pet-details')
};

const modals = {
    pet: document.getElementById('modal-pet'),
    app: document.getElementById('modal-app')
};

// Utilities
const showScreen = (name) => {
    Object.keys(screens).forEach(key => {
        screens[key].classList.toggle('active', key === name);
    });
};

const openModal = (modal) => modal.classList.add('active');
const closeModal = (modal) => modal.classList.remove('active');

const formatDate = (dateStr) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('pt-BR', options);
};

// API Functions
async function login(cpf) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf })
    });
    return response.json();
}

async function fetchPets() {
    const response = await fetch(`/api/pets?tutor_id=${State.tutor.id}`);
    State.pets = await response.json();
    renderPets();
}

async function fetchApplications(petId) {
    const response = await fetch(`/api/pets/${petId}/applications`);
    State.applications = await response.json();
    renderApplications();
}

// Logic: Status Calculation
function calculateStatus(applications) {
    if (applications.length === 0) return 'atrasado';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let status = 'em dia';
    
    applications.forEach(app => {
        const nextDue = new Date(app.next_due_date + 'T12:00:00Z');
        const diffDays = (nextDue - today) / (1000 * 60 * 60 * 24);
        
        if (diffDays < 0) {
            status = 'atrasado';
        } else if (diffDays <= 30 && status !== 'atrasado') {
            status = 'pendente';
        }
    });

    return status;
}

// Rendering
function renderPets() {
    const container = document.getElementById('pets-list');
    container.innerHTML = '';

    if (State.pets.length === 0) {
        container.innerHTML = '<div class="loading-state">Nenhum pet cadastrado. Vamos começar?</div>';
        return;
    }

    State.pets.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'pet-card card';
        
        const speciesIcon = pet.species === 'Gato' ? 'ph ph-cat' : 'ph ph-dog';
        
        // Note: For real status we'd need to fetch applications for all pets or the server would calculate it.
        // For this MVP, we'll fetch details when clicking.
        
        card.innerHTML = `
            <div class="pet-card-main">
                <div class="pet-card-icon">
                    <i class="${speciesIcon}"></i>
                </div>
                <div class="pet-card-info">
                    <h4>${pet.name}</h4>
                    <p>${pet.breed || pet.species}</p>
                </div>
            </div>
            <i class="ph ph-caret-right"></i>
        `;
        
        card.onclick = () => showPetDetails(pet);
        container.appendChild(card);
    });
}

async function renderApplications() {
    const container = document.getElementById('applications-list');
    container.innerHTML = '';

    const statusBadge = document.getElementById('pet-status-badge');
    const status = calculateStatus(State.applications);
    
    statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    statusBadge.className = `badge badge-${status === 'em dia' ? 'success' : (status === 'pendente' ? 'warning' : 'danger')}`;

    if (State.applications.length === 0) {
        container.innerHTML = '<div class="loading-state">Nenhuma aplicação registrada.</div>';
        return;
    }

    State.applications.forEach(app => {
        const iconMap = {
            'Vacina': 'ph ph-needle',
            'Vermifugação': 'ph ph-bug-beetle',
            'Antipulgas': 'ph ph-bug'
        };

        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-icon">
                <i class="${iconMap[app.type] || 'ph ph-info'}"></i>
            </div>
            <div class="timeline-content">
                <div class="date">${formatDate(app.date)}</div>
                <h5>${app.type}: ${app.description}</h5>
                <small>Próxima em: ${formatDate(app.next_due_date)}</small>
            </div>
        `;
        container.appendChild(item);
    });
}

// Transitions
async function showPetDetails(pet) {
    State.currentPet = pet;
    document.getElementById('detail-pet-name').textContent = pet.name;
    document.getElementById('detail-pet-species').textContent = pet.species;
    document.getElementById('detail-pet-breed').textContent = pet.breed || 'Raça não informada';
    
    const iconEl = document.getElementById('pet-icon');
    iconEl.className = pet.species === 'Gato' ? 'ph ph-cat' : 'ph ph-dog';

    showScreen('details');
    await fetchApplications(pet.id);
}

// Event Listeners
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const user = await login(cpf);
    State.tutor = user;
    document.getElementById('tutor-name').textContent = `Olá, ${user.name}`;
    showScreen('dashboard');
    fetchPets();
};

document.getElementById('logout-btn').onclick = () => {
    State.tutor = null;
    showScreen('login');
};

document.getElementById('back-to-dashboard').onclick = () => showScreen('dashboard');

document.getElementById('add-pet-btn').onclick = () => openModal(modals.pet);
document.getElementById('add-app-btn').onclick = () => {
    // Set today as default date
    document.getElementById('app-date').valueAsDate = new Date();
    openModal(modals.app);
};

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = () => {
        closeModal(modals.pet);
        closeModal(modals.app);
    };
});

document.getElementById('pet-form').onsubmit = async (e) => {
    e.preventDefault();
    const petData = {
        tutor_id: State.tutor.id,
        name: document.getElementById('pet-name').value,
        species: document.getElementById('pet-species').value,
        breed: document.getElementById('pet-breed').value
    };

    const response = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData)
    });

    if (response.ok) {
        closeModal(modals.pet);
        fetchPets();
        e.target.reset();
    }
};

document.getElementById('app-form').onsubmit = async (e) => {
    e.preventDefault();
    const appData = {
        type: document.getElementById('app-type').value,
        description: document.getElementById('app-desc').value,
        date: document.getElementById('app-date').value
    };

    const response = await fetch(`/api/pets/${State.currentPet.id}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
    });

    if (response.ok) {
        closeModal(modals.app);
        fetchApplications(State.currentPet.id);
        e.target.reset();
    }
};

// Mask/Simple validation for CPF (just numbers)
document.getElementById('cpf').oninput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
};

// PWA: Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Falha ao registrar Service Worker', err));
    });
}

