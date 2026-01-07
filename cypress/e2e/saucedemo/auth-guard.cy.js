import LoginPage from '../../pages/saucedemo/LoginPage';

describe('Auth guard / session behavior (SauceDemo)', () => {
  beforeEach(() => {
    // Start each test with a clean browser state
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should show login page when not authenticated', () => {
    cy.visit('/');

    // Assert login page UI is present
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');

    // Optional: URL check
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should allow accessing inventory after login', () => {
    cy.loginAs('validUser');

    // Inventory URL exists when session is valid
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="inventory-container"]').should('be.visible');
  });

  it('should require login again after clearing session storage', () => {
    // Login first
    cy.loginAs('validUser');
    cy.url().should('include', '/inventory.html');

    // Simulate session loss
    cy.clearCookies();
    cy.clearLocalStorage();

    // Try to go to inventory again.
    // SauceDemo may not "redirect" properly, but it should not show inventory UI.
    cy.visit('/inventory.html', { failOnStatusCode: false });

    // Assert we're not in inventory state (auth required)
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});
