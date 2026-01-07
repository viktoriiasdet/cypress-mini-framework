import LoginPage from '../../pages/saucedemo/LoginPage';
import Header from '../../pages/saucedemo/Header';

describe('Login', () => {

  beforeEach(() => {
    cy.fixture('users').as('users');
  });

  it('should login with valid credentials', function () {
    cy.login(
      this.users.validUser.username,
      this.users.validUser.password
    );

    cy.url().should('include', '/inventory');
  });

  it('should show error for locked user', function () {
    cy.login(
      this.users.lockedUser.username,
      this.users.lockedUser.password
    );

    cy.get(LoginPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'locked out');
  });

  it('should logout successfully', function () {
    cy.login(
      this.users.validUser.username,
      this.users.validUser.password
    );

    Header.logout();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
