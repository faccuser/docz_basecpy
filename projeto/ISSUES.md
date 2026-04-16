# Backlog de Evolução - Projeto Docz

Este documento descreve as issues propostas para a evolução do protótipo MVP do Docz. As tarefas estão divididas por categorias funcionais.

---

## Perfil do Pet

### ISSUE-01: Upload de Imagem de Perfil
[PRIORIDADE: Baixa]
[STATUS: Pendente]

- **Descrição**: Permitir que o tutor envie uma foto para o perfil de cada pet, facilitando a identificação visual.
- **Requisitos**:
  - Implementar suporte para upload de arquivos no frontend (`input type="file"`).
  - Criar rota de API para processar e salvar imagens (sugestão: usar `multer` no Node.js).
  - Atualizar o banco de dados (tabela `pets`) para armazenar o caminho/URL da imagem.
  - Exibir a imagem nos cards da Home e no cabeçalho de detalhes.

---

## Funcionalidades de Tratamento

### ISSUE-02: Upload de Imagem de Lote/Etiqueta
[PRIORIDADE: Média]
[STATUS: Pendente]

- **Descrição**: Durante o registro de um novo tratamento, permitir anexar uma foto da etiqueta do medicamento ou do frasco da vacina (onde consta o lote).
- **Requisitos**:
  - Adicionar campo de foto no modal de "Novo Tratamento".
  - Armazenar a referência da imagem na tabela `applications`.
  - Exibir a imagem na timeline do pet ao clicar em um registro.

### ISSUE-03: Validação de registro por Código (QR / EAN13)
[PRIORIDADE: Média]
[STATUS: Pendente]

- **Descrição**: Automatizar o preenchimento de campos através da leitura de códigos de barras (EAN13) ou QR Codes presentes nas embalagens.
- **Requisitos**:
  - Integrar biblioteca de scanner no frontend (ex: `html5-qrcode`).
  - Extrair informações do código lido para preencher automaticamente os campos de descrição ou lote.

### ISSUE-04: Registro via QR Code "Docz-Ready"
[PRIORIDADE: Baixa]
[STATUS: Pendente]

- **Descrição**: Suportar QR Codes específicos que contenham um JSON com dados básicos (tipo, descrição, lote) para registro instantâneo.
- **Requisitos**:
  - Definir um padrão de dados JSON para o QR Code.
  - Criar funcionalidade "Novo Tratamento via Scan" que processe o QR e abra o formulário já preenchido.

### ISSUE-05: Emissão de Certificado "Em Dia"
[PRIORIDADE: Média]
[STATUS: Pendente]

- **Descrição**: Gerar um documento em PDF ou imagem que comprove que o pet está com todas as obrigações de saúde em dia.
- **Requisitos**:
  - Criar um layout de "Certificado de Saúde" com as logos do sistema e dados do pet.
  - Implementar geração de PDF no server-side (ex: `pdfkit` ou `puppeteer`) ou client-side (ex: `jspdf`).
  - Exibir botão "Gerar Certificado" apenas quando o status do pet for `EM DIA`.

---

## Alertas e Notificações

### ISSUE-06: Notificações de Vencimento
[PRIORIDADE: Alta]
[STATUS: Pendente]

- **Descrição**: Notificar o tutor quando um reforço estiver próximo do vencimento ou já atrasado.
- **Requisitos**:
  - Implementar Web Push Notifications através do Service Worker.
  - Criar um job agendado no servidor (ex: `node-cron`) para verificar prazos e disparar notificações.

### ISSUE-07: Dashboards e Indicadores Visuais
[PRIORIDADE: Alta]
[STATUS: Pendente]

- **Descrição**: Melhorar a visibilidade das pendências através de novos componentes visuais.
- **Requisitos**:
  - **Home**: Adicionar contadores globais (ex: "3 pets em dia, 1 atrasado").
  - **Timeline**: Adicionar ícones de status (Check verde / Exclamação vermelha) em cada linha do histórico para destacar aplicações que já expiraram a validade de reforço.
  - **Identificação Visual**: Usar badges coloridas e ícones semânticos para reduzir a carga cognitiva do usuário.

---

## Segurança

### ISSUE-08: Autenticação Robusta e Recuperação
[PRIORIDADE: Baixa]
[STATUS: Pendente]

- **Descrição**: Evoluir o login de "apenas CPF" para um sistema seguro com senha e recuperação de conta.
- **Requisitos**:
  - Criar campo de senha (hash com `bcrypt`).
  - Implementar fluxo de "Esqueci minha senha" (envio de e-mail ou código de validação).
  - Adicionar JWT (JSON Web Tokens) para sessões seguras e proteção das rotas de API.
