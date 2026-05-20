describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach('Acessar url',() => {
    cy.visit('cypress-do-zero-a-nuvem/src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () =>{
    const longText = Cypress._.repeat('teste', 10)
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type('Luiz')
    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type('Fernando')
    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type('email@teste.com.br')

    cy.get('#email-checkbox').as('emailCheckbox').should('be.visible')
    cy.get('@emailCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type(longText, {delay: 300})

    
    cy.contains('button', 'Enviar').as('button')
    cy.get('@button').click()

    cy.get('.success > strong').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type('Luiz')
    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type('Fernando')
    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type('email@teste,com.br')

    cy.get('#email-checkbox').as('emailCheckbox').should('be.visible')
    cy.get('@emailCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type('mensagem de teste', {delay: 0})

    cy.contains()
    cy.get('@button').click()
    
    cy.get('.error').should('be.visible')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type('Luiz')
    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type('Fernando')
    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type('email@teste,com.br')

    cy.get('#phone-checkbox').as('phoneCheckbox').should('be.visible')
    cy.get('@phoneCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type('mensagem de teste', {delay: 0})

    cy.contains()
    cy.get('@button').click()
    
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type('Luiz').should('have.value', 'Luiz')
    cy.get('@nameField').clear().should('have.value', '')

    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type('Fernando').should('have.value', 'Fernando')
    cy.get('@lastNameField').clear().should('have.value', '')

    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type('email@teste.com.br').should('have.value', 'email@teste.com.br')
    cy.get('@email').clear()

    cy.get('#email-checkbox').as('emailCheckbox').should('be.visible')
    cy.get('@emailCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type('mensagem de teste', {delay: 0}).should('have.value', 'mensagem de teste')
    cy.get('@textArea').clear().should('have.value', '')

    cy.contains()
    cy.get('@button').click()
    
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => { 
    cy.fillMandatoryFieldsAndSubmit('Luiz', 'Fernando', 'teste@gmail.com', 'teste testado')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => { 
    const data = {
      firstName : 'Luiz',
      lastName : 'Fernando',
      email : 'teste@teste.com.br',
      message : 'Esse é um teste'
    }
    cy.fillMandatoryFieldsAndSubmitObj(data)
  })
  it('envia o formuário com sucesso usando um comando customizado', () => { 
    cy.fillMandatoryFieldsAndSubmitObj()
  })
  it('seleciona um produto (YouTube) por seu texto', () => { 
    cy.get('select').select('Youtube').should('have.value', 'youtube')
  })
  it('seleciona um produto (mentoria) por seu valor', () => { 
    cy.get('select').select('mentoria').should('have.value', 'mentoria') 
  })
  it('seleciona um produto (Blog) por seu índice', () => { 
    cy.get('select').select(1).should('have.value', 'blog') 
  })
  it.only('seleciona uma opçao aleatoria para o campo select', () => { 
    cy.get('select option').as('options').its('length', {log: false}).then(n=>{
      cy.get('@options', {log: false}).then($options => {
        const randomOptionIndex = Cypress._.random(1,n - 1)
        const randomOptionText = $options[randomOptionIndex].innerText
        cy.get('select').select(randomOptionText)
      })
    }) 
  })
})