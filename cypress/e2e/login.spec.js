import loginPage from '../pages/LoginPage'
import dashboardPage from '../pages/DashboardPage'

describe('Login tests (POM + intercept)', () => {
    beforeEach(() => {
        cy.fixture('users').as('users') // memuat data fixture
    })

    it('Login success using UI (valid credentials)', function () {
        cy.intercept('POST', '/web/index.php/auth/validateCredentials*').as('loginReq')
        loginPage.visit()
        loginPage.login(this.users.validUser.username, this.users.validUser.password)
        cy.wait('@loginReq').its('response.statusCode').should('be.oneOf', [200, 302])
        dashboardPage.isLoaded() // cek dashboard muncul
    })

    it('Login fail with wrong password', function () {
        cy.intercept('POST', '/web/index.php/auth/validateCredentials*').as('loginFail')
        loginPage.visit()
        loginPage.login(this.users.invalidUser.username, this.users.invalidUser.password)
        cy.wait('@loginFail')
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials')
    })

    it('Form validation: empty username', () => {
        loginPage.visit()
        loginPage.password().type('anything')
        loginPage.submit().click()
        cy.get('.oxd-input-group .oxd-text--span').should('exist')
    })
})