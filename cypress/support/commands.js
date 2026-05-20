Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (
    name,
    lastName,
    email,
    message
)  => {
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type(name).should('have.value', name)

    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type(lastName).should('have.value', lastName)

    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type(email).should('have.value', email);

    cy.get('#email-checkbox').as('emailCheckbox').should('be.visible')
    cy.get('@emailCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type(message, {delay: 0}).should('have.value', message)

    cy.contains('button', 'Enviar').as('button')
    cy.get('@button').click()
    
    cy.get('.success > strong').should('be.visible')
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmitObj', (data = { 
    firstName: 'Jhon',
    lastName: 'Smith',
    email: 'Jhon@gmail.com',
    message: 'mensagem de teste padrao'

})  => {
    cy.get('#firstName').as('nameField').should('be.visible')
    cy.get('@nameField').type(data.firstName).should('have.value', data.firstName)

    cy.get('#lastName').as('lastNameField').should('be.visible')
    cy.get('@lastNameField').type(data.lastName).should('have.value', data.lastName)

    cy.get('#email').as('email').should('be.visible')
    cy.get('@email').type(data.email).should('have.value', data.email);

    cy.get('#email-checkbox').as('emailCheckbox').should('be.visible')
    cy.get('@emailCheckbox').click()


    cy.get('#open-text-area').as('textArea').should('be.visible')
    cy.get('@textArea').type(data.message, {delay: 0}).should('have.value', data.message)

    cy.contains('button', 'Enviar').as('button')
    cy.get('@button').click()
    
    cy.get('.success > strong').should('be.visible')
})

