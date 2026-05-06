# Docz - Controle de Vacinas Pet

<p>
  <img src="https://img.shields.io/badge/Status-MVP-blue?style=for-the-badge" alt="Status MVP">
  <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge" alt="PWA Ready">
</p>

**Docz** é uma aplicação web progressiva (PWA) projetada para simplificar a gestão da saúde animal. Com foco na facilidade de uso e mobilidade, o Docz permite que tutores acompanhem o histórico de vacinação, vermifugação e antiparasitários de seus pets em tempo real.



## Funcionalidades Atuais (MVP)

- **Acesso Simples**: Login rápido utilizando apenas o CPF do tutor.
- **Gestão de Pets**: Cadastro e remoção de múltiplos pets com identificação de espécie e raça.
- **Histórico de Tratamento**: Registro detalhado de aplicações contendo descrição, número de lote e data.
- **Cálculo de Status Inteligente**: Indicadores visuais automáticos baseados nas datas de validade:
  - **Em dia**: Todas as vacinas obrigatórias dentro do prazo.
  - **Atrasado**: Pelo menos uma aplicação venceu o prazo de reforço.
  - **Pendente**: Ausência total de registros obrigatórios.
- **Experiência PWA**: Instalável em dispositivos móveis com suporte básico offline via Service Worker.



## Projeto

O diagrama de caso de uso mostra as principais funcionalidades (figura 1.a) para esta versão do protótipo (versão 1). Nela, o usuário (tutor), logado no sistema, pode cadastrar seus pets e, consequentemente, registrar os tratamentos de cada pet, controlando posteriormente o status ("pendente", "atrasado" ou "em dia") de cada pet de acordo com os controles de tempo e validade de cada tratamento.

![Image](https://github.com/amsilva/docz/blob/main/projeto/imagens/img_uc_class.png)
> Figura 1. (a) Caso de uso e (b) diagrama de classes

Nesta versão do sistema, minimalista e focada no controle fácil de tratamentos de medicação para pets, as principais entidades são: Tutor, Pet e Tratamento. Um tutor pode possuir vários pets. Cada pet pode possuir vários tratamentos registrados que, uma vez inseridos, passam a ser controlados pelo sistema de alerta (figura 1.b e figura 2).

![Image](https://github.com/amsilva/docz/blob/main/projeto/imagens/img_er.png)
> Figura 2. Modelo de dados (diagrama ER)



## Tecnologias Utilizadas

O projeto foi construído com uma stack leve e performática para garantir compatibilidade e rapidez:

- **Frontend**: 
  - HTML5 & CSS3 (Design Moderno & Responsivo)
  - Vanilla JavaScript (Manipulação de DOM e Fetch API)
- **Backend**:
  - Node.js com Express
  - SQLite3 para persistência de dados local.
- **PWA**:
  - Manifest JSON e Service Workers para suporte a instalação e cache.



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



## Resultados preliminares (ver. 1)

A principal tela do sistema é a listagem de pets de um tutor logado (figura 3.a e 3.c). Nela, além da identificação do usuário, é possível sair (logout) e cadastrar um novo pet. Ao cadastrar um novo pet (figura 3.b), o usuário deve informar o nome, a espécie e a raça do novo pet a ser inserido no sistema. Imediatamente após a inserção, o pet é considerado "pendente" quanto aos tratamentos necessários (figura 3.c).

![Image](https://github.com/amsilva/docz/blob/main/projeto/imagens/img_tela1.png)
> Figura 3. (a) Timeline vazia, (b) cadastro de pet e (c) timeline preenchida

Ao selecionar um pet da lista, é apresentada a listagem de seus tratamentos, que pode estar incompleta (figura 4.a), completa porém atrasada (figura 4.b), ou completa e em dia. Caso um pet possua pendências ou tratamentos com validade vencida, ele é identificado como tal na timeline do tutor (figura 4.c).

![Image](https://github.com/amsilva/docz/blob/main/projeto/imagens/img_tela2.png)
> Figura 4. Listagem de (a) tratamento incompleto, (b) tratamento completo e (c) timeline de pet "em dia"



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



## Roadmap

Próximos passos. Sugestões de evolução e melhorias

- #1 Upload de Imagem de Perfil
- #2 Upload de Imagem de Lote/Etiqueta
- #3 Validação de registro por Código (QR / EAN13)
- #4 Registro via QR Code "Docz-Ready"
- #5 Emissão de Certificado "Em Dia"
- #6 Notificações de Vencimento
- #7 Dashboards e Indicadores Visuais
- #8 Autenticação Robusta e Recuperação
- #9 Certificado Digital (Selo de Autenticidade)


---
