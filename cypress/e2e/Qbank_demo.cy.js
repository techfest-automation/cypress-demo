/// <reference types="Cypress" />
const testData = require("../../TestData/json_testData1.json")

describe('Qbank Test', () => {

  it('Qbank transaction Test', () => {
    //Handling Uncaught Exception
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    // Launch Qbank URL
    cy.visit(testData.url)

    //Verify Welcome text
    cy.get('.qb-signin-heading').should('contain.text', 'Welcome back!')

    //Login to Qbank
    cy.get('#qb-username').type(testData.username)
    cy.get('#qb-password').type(testData.password)
    cy.get('.qb-signin-button').click()

    // Verify User Thomas
    cy.get('.qbl-username-link').should('be.visible').should('have.text', 'Thomas')

    // Get Salary account balance
    cy.xpath("//div[text()='Salary Account']/../..//div[contains(@class,'qb-account-balance')]").invoke('text').as('AccountBalance')
    cy.get('@AccountBalance').then(bal => {
      cy.log(bal)
    })

    //Pay Electricity Bill from Salary account
    cy.xpath("//div[text()='Fund Transfer']").click()
    cy.get('#qbf-accountname-input').select('Salary Account')
    cy.get('#qbf-toaccount-input').select('Electricity Bill')
    cy.get('#qbf-amount-input').type('1')
    cy.get('#qbf-memo-input').type('Elecricity Bill')
    cy.get('#sub-qb').click()

    // Verify Transfer Confirmation
    cy.get('.qbf-box-heading').should('contain.text', 'Transfer Confirmation')
    cy.xpath("//button[text()='Go to Account Summary']", { timeout: 10000 }).click()

    // Logout
    cy.get('.qb-seagreen-button').click()

  })
})