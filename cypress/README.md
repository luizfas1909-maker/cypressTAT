# 🚀 Automação de Testes Web com Cypress

Projeto de automação de testes end-to-end desenvolvido com Cypress durante estudos e práticas de Quality Assurance (QA).

## 📌 Objetivo

Automatizar cenários de testes funcionais em aplicações web, validando comportamentos críticos da interface, fluxos de usuário e regras de negócio.

---

## 🛠 Tecnologias Utilizadas

- Cypress
- JavaScript
- Node.js
- VS Code

---

## 📂 Estrutura do Projeto

```bash
cypress/
 ├── e2e/
 │    └── CAC-TAT.cy.js
 ├── fixtures/
 ├── support/
cypress.config.js
package.json
```

---

## ✅ Cenários Automatizados

- Validação de título da página
- Preenchimento de formulários
- Upload de arquivos
- Seleção de checkboxes
- Validação de links
- Testes responsivos (mobile viewport)
- Testes exploratórios e funcionais

---

## ▶️ Como Executar o Projeto

### Instalar dependências

```bash
npm install
```

### Abrir Cypress

```bash
npx cypress open
```

### Executar em viewport mobile

```bash
npm run cy:open:mobile
```

### Executar testes em modo headless

```bash
npm test
npm test:mobile
```

---

## 📱 Configuração Mobile

Viewport configurada para:

```js
viewportWidth: 410
viewportHeight: 860
```

---

## 📖 Aprendizados

Durante o desenvolvimento deste projeto foram praticados conceitos como:

- Boas práticas de automação
- Seletores CSS
- Assertions
- Commands customizados
- Estruturação de testes
- Massa de dados
- Testes E2E

---

## 👨‍💻 Autor

Luiz Fernando Aragão

- LinkedIn: https://www.linkedin.com/in/luizfaragao/
- GitHub: https://github.com/luizfas1909-maker