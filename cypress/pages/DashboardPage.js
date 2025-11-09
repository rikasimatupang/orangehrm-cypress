class LoginPage {
    visit() {
        cy.visit('/')
    }
    username() {
        return cy.get('input[name="username"]')
    }
    password() {
        return cy.get('input[name="password"]')
    }
    submit() {
        return cy.get('button[type="submit"]')
    }
    login(username, password) {
        this.username().clear().type(username)
        this.password().clear().type(password)
        this.submit().click()
    }
}
export default new LoginPage()