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
    
        // Typing into input was flaky without waiting
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
        cy.get('#login2').click({ timeout: 10000 })

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

        // Add Samsung galaxy s6 to cart
        cy.get('a[href="prod.html?idp_=1"')
            .contains('Samsung galaxy s6')
            .click()

        cy.get('[onclick="addToCart(1)"]').click()

        // Ensure add to cart post finishes
        cy.intercept('https://api.demoblaze.com/addtocart').as('addToCart')

        cy.wait('@addToCart')

        // Navigate to the cart and verify you have the correct type
        cy.get('#cartur').click()

        cy.contains('Samsung galaxy s6')

    })
})