const { v4: uuidv4 } = require('uuid');

const email = `${uuidv4()}@email.com`;
const password = uuidv4();

describe('Sample Suite', () => {
    it('Does the given instructions', () => {
        cy.visit('https://www.demoblaze.com')

        cy.get('#signin2').click()
    
        cy.wait(500)

        cy.get('#sign-username', { timeout: 10000 })
          .should('be.visible')
          .type(email)
          .should('have.value', email)


        cy.get('#sign-password', { timeout: 10000 })
            .should('be.visible')
            .type(password)
            .should('have.value', password)

        cy.get('[onclick="register()"]', { timeout: 10000 })
            .should('be.visible')
            .click()
    })
})