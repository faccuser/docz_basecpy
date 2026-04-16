# Docz - Controle de Vacinas Pet

<p>
  <img src="https://img.shields.io/badge/Status-MVP-blue?style=for-the-badge" alt="Status MVP">
  <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge" alt="PWA Ready">
  <img src="https://img.shields.io/badge/JS-Vanilla-yellow?style=for-the-badge" alt="Vanilla JS">
</p>

**Docz** é uma aplicação web progressiva (PWA) projetada para simplificar a gestão da saúde animal. Com foco na facilidade de uso e mobilidade, o Docz permite que tutores acompanhem o histórico de vacinação, vermifugação e antiparasitários de seus pets em tempo real.

---

## Funcionalidades Atuais (MVP)

- **Acesso Simples**: Login rápido utilizando apenas o CPF do tutor.
- **Gestão de Pets**: Cadastro e remoção de múltiplos pets com identificação de espécie e raça.
- **Histórico de Tratamento**: Registro detalhado de aplicações contendo descrição, número de lote e data.
- **Cálculo de Status Inteligente**: Indicadores visuais automáticos baseados nas datas de validade:
  - **Em dia**: Todas as vacinas obrigatórias dentro do prazo.
  - **Atrasado**: Pelo menos uma aplicação venceu o prazo de reforço.
  - **Pendente**: Ausência total de registros obrigatórios.
- **Experiência PWA**: Instalável em dispositivos móveis com suporte básico offline via Service Worker.

---

## Tecnologias Utilizadas

O projeto foi construído com uma stack leve e performática para garantir compatibilidade e rapidez:

- **Frontend**: 
  - HTML5 & CSS3 (Design Moderno & Responsivo)
  - Vanilla JavaScript (Manipulação de DOM e Fetch API)
  - [Phosphor Icons](https://phosphoricons.com/) para interface visual.
- **Backend**:
  - Node.js com Express
  - SQLite3 para persistência de dados local.
- **PWA**:
  - Manifest JSON e Service Workers para suporte a instalação e cache.

---

## Como Executar o Projeto

1. **Pré-requisitos**:
   - Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

2. **Instalação**:
   ```bash
   npm install
   ```

3. **Execução**:
   ```bash
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000`.

---

## Estrutura de Arquivos

```text
├── public/
│   ├── index.html      # Estrutura principal da aplicação
│   ├── style.css       # Estilização completa e variáveis de design
│   ├── app.js          # Lógica de negócio e comunicação com API
│   ├── sw.js           # Service Worker para suporte PWA
│   └── manifest.json   # Configurações de instalação mobile
├── server.js           # API REST em Node.js e Express
├── database.sqlite     # Banco de dados SQLite persistente
└── package.json        # Dependências e scripts do projeto
```


---

## Documentação Visual

> [!NOTE]
> Esta seção será preenchida com os diagramas de caso de uso, entidade/relacionamento e capturas de tela das principais funcionalidades.

### Diagramas
- **Caso de Uso**: [Em breve]
- **Entidade e Relacionamento**: [Em breve]

### Screenshots
- **Tela de Login**: [Em breve]
- **Dashboard de Pets**: [Em breve]
- **Timeline de Tratamentos**: [Em breve]

---
