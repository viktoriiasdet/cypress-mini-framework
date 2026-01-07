class LoginPage {
  username = '#username';
  password = '#password';
  loginButton = 'button[type="submit"]';
  flash = '#flash';
  logoutButton = 'a[href="/logout"]';

  visit() {
    cy.visitHeroku('/login');
  }

  login(user, pass) {
    cy.get(this.username).clear().type(user);
    cy.get(this.password).clear().type(pass);
    cy.get(this.loginButton).click();
  }

  assertFlashContains(text) {
    cy.get(this.flash).should('be.visible').and('contain.text', text);
  }
}

export default new LoginPage();
