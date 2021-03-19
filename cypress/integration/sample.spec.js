const { v4: uuidv4 } = require('uuid');

const email = `${uuidv4()}@email.com`;
const password = uuidv4();

describe('Sample Suite', () => {
    it('Does the given instructions', () => {
        cy.visit('https://www.demoblaze.com')

        // Verify Logged Out state
        cy.get('#logout2').should('not.be.visible')

        // Register User
        cy.get('#signin2').click()
    
        // Typing into input is flaky without this wait, possibly due to XHR requests messing up `type` call
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

        // Login as User
        cy.get('#login2').click()

        cy.wait(500)

        cy.get('#loginusername', { timeout: 10000 })
            .should('be.visible')
            .type(email)
            .should('have.value', email)

        cy.get('#loginpassword', { timeout: 10000 })
            .should('be.visible')
            .type(password)
            .should('have.value', password)

        cy.get('[onclick="logIn()"]', { timeout: 10000 })
            .should('be.visible')
            .click()

        // Verify Logged In state
        cy.get('#logout2').should('be.visible')
    })
})