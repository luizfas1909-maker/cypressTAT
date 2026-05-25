describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach("Acessar url", () => {
    cy.visit("cypress-do-zero-a-nuvem/src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("teste", 10);
    cy.clock();
    cy.get("#firstName").as("nameField").should("be.visible");
    cy.get("@nameField").type("Luiz");
    cy.get("#lastName").as("lastNameField").should("be.visible");
    cy.get("@lastNameField").type("Fernando");
    cy.get("#email").as("email").should("be.visible");
    cy.get("@email").type("email@teste.com.br");

    cy.get("#email-checkbox").as("emailCheckbox").should("be.visible");
    cy.get("@emailCheckbox").click();

    cy.get("#open-text-area").as("textArea").should("be.visible");
    cy.get("@textArea").type(longText, { delay: 0 });

    cy.get(".button").click();

    cy.get(".success > strong").should("be.visible");
    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.get("#firstName").as("nameField").should("be.visible");
    cy.get("@nameField").type("Luiz");
    cy.get("#lastName").as("lastNameField").should("be.visible");
    cy.get("@lastNameField").type("Fernando");
    cy.get("#email").as("email").should("be.visible");
    cy.get("@email").type("email@teste,com.br");

    cy.get("#email-checkbox").as("emailCheckbox").should("be.visible");
    cy.get("@emailCheckbox").click();

    cy.get("#open-text-area").as("textArea").should("be.visible");
    cy.get("@textArea").type("mensagem de teste", { delay: 0 });

    cy.get("@button").click();

    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get("error").should("not.be.visible");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").as("nameField").should("be.visible");
    cy.get("@nameField").type("Luiz");
    cy.get("#lastName").as("lastNameField").should("be.visible");
    cy.get("@lastNameField").type("Fernando");
    cy.get("#email").as("email").should("be.visible");
    cy.get("@email").type("email@teste,com.br");

    cy.get("#phone-checkbox").as("phoneCheckbox").should("be.visible");
    cy.get("@phoneCheckbox").click();

    cy.get("#open-text-area").as("textArea").should("be.visible");
    cy.get("@textArea").type("mensagem de teste", { delay: 0 });

    cy.contains();
    cy.get("@button").click();

    cy.get(".error").should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").as("nameField").should("be.visible");
    cy.get("@nameField").type("Luiz").should("have.value", "Luiz");
    cy.get("@nameField").clear().should("have.value", "");

    cy.get("#lastName").as("lastNameField").should("be.visible");
    cy.get("@lastNameField").type("Fernando").should("have.value", "Fernando");
    cy.get("@lastNameField").clear().should("have.value", "");

    cy.get("#email").as("email").should("be.visible");
    cy.get("@email")
      .type("email@teste.com.br")
      .should("have.value", "email@teste.com.br");
    cy.get("@email").clear();

    cy.get("#email-checkbox").as("emailCheckbox").should("be.visible");
    cy.get("@emailCheckbox").click();

    cy.get("#open-text-area").as("textArea").should("be.visible");
    cy.get("@textArea")
      .type("mensagem de teste", { delay: 0 })
      .should("have.value", "mensagem de teste");
    cy.get("@textArea").clear().should("have.value", "");

    cy.contains();
    cy.get("@button").click();

    cy.get(".error").should("be.visible");
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit(
      "Luiz",
      "Fernando",
      "teste@gmail.com",
      "teste testado",
    );
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Luiz",
      lastName: "Fernando",
      email: "teste@teste.com.br",
      message: "Esse é um teste",
    };
    cy.fillMandatoryFieldsAndSubmitObj(data);
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmitObj();
  });
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("Youtube").should("have.value", "youtube");
  });
  it("seleciona um produto (mentoria) por seu valor", () => {
    cy.get("select").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });
  it("seleciona uma opçao aleatoria para o campo select", () => {
    cy.get("select option")
      .as("options")
      .its("length", { log: false })
      .then((n) => {
        cy.get("@options", { log: false }).then(($options) => {
          const randomOptionIndex = Cypress._.random(1, n - 1);
          const randomOptionText = $options[randomOptionIndex].innerText;
          cy.get("select").select(randomOptionText);
        });
      });
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .should("have.value", "feedback")
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"] ').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('#check input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck();
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]').selectFile("cypress/fixtures/example.json");
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]').selectFile("cypress/fixtures/example.json", {
      action: "drag-drop",
    });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("example");
    cy.get('input[type="file"]').selectFile("@example");
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade").should(
      "have.attr",
      "target",
      "_blank",
    );
  });
  it("testa a página da política de privacidade de forma independente", () => {
    cy.contains("a", "Política de Privacidade").invoke("removeAttr", "target");
  });
  Cypress._.times(5, () => {
    it("Preenche os campos obrigatórios e envia o formulário 5x", () => {
      const longText = Cypress._.repeat("teste", 10);
      cy.clock();
      cy.get("#firstName").as("nameField").should("be.visible");
      cy.get("@nameField").type("Luiz");
      cy.get("#lastName").as("lastNameField").should("be.visible");
      cy.get("@lastNameField").type("Fernando");
      cy.get("#email").as("email").should("be.visible");
      cy.get("@email").type("email@teste.com.br");

      cy.get("#email-checkbox").as("emailCheckbox").should("be.visible");
      cy.get("@emailCheckbox").click();

      cy.get("#open-text-area").as("textArea").should("be.visible");
      cy.get("@textArea").type(longText, { delay: 0 });

      cy.get(".button").click();

      cy.get(".success > strong").should("be.visible");
      cy.tick(3000);
      cy.get(".success").should("not.be.visible");
    });
  });
  Cypress._.times(3, () => {
    it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
      cy.get(".success")
        .should("not.be.visible")
        .invoke("show")
        .should("be.visible")
        .and("contain", "Mensagem enviada com sucesso.")
        .invoke("hide")
        .should("not.be.visible");
      cy.get(".error")
        .should("not.be.visible")
        .invoke("show")
        .should("be.visible")
        .and("contain", "Valide os campos obrigatórios");
    });
  });
  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get("#firstName").should('be.visible').invoke('val', 'Rodolfo Almeida')
  })
  it.only('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html' 
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).to.include('CAC TAT')
    })
  })
});
