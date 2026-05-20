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

    cy.get('.button').as('button').should('be.visible')
    cy.get('@button').click()
    
    cy.get('.success > strong').should('be.visible')
})