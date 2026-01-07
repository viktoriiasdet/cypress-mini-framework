import ProductsPage from '../../pages/saucedemo/ProductsPage';
import CartPage from '../../pages/saucedemo/CartPage';
import CheckoutInfoPage from '../../pages/saucedemo/CheckoutInfoPage';

// These tests are high-signal in interviews because they verify validation rules.
// They also show you know how to write negative scenarios cleanly.

describe('Checkout - validation (negative cases)', () => {
  beforeEach(() => {
    // Use your custom login command to avoid Mocha `this` issues and alias timing.
    cy.loginAs(); // or cy.loginAsValidUser() depending on your project
    cy.url().should('include', '/inventory');
  });

  // Helper that navigates to checkout info page quickly.
  // (Good practice: reusable “setup” steps to keep tests focused on assertions.)
  const goToCheckoutInfo = () => {
    ProductsPage.addToCartButtonByName('Sauce Labs Backpack').click();
    ProductsPage.openCart();
    cy.url().should('include', '/cart.html');
    CartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');
  };

  it('should show error when First Name is missing', () => {
    goToCheckoutInfo();

    // Fill only last name and zip, leave first name empty
    cy.get(CheckoutInfoPage.lastName).type('QA');
    cy.get(CheckoutInfoPage.postalCode).type('86150');
    CheckoutInfoPage.continue();

    cy.get(CheckoutInfoPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

  it('should show error when Last Name is missing', () => {
    goToCheckoutInfo();

    cy.get(CheckoutInfoPage.firstName).type('Viktoriia');
    cy.get(CheckoutInfoPage.postalCode).type('86150');
    CheckoutInfoPage.continue();

    cy.get(CheckoutInfoPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Last Name is required');
  });

  it('should show error when Postal Code is missing', () => {
    goToCheckoutInfo();

    cy.get(CheckoutInfoPage.firstName).type('Viktoriia');
    cy.get(CheckoutInfoPage.lastName).type('QA');
    CheckoutInfoPage.continue();

    cy.get(CheckoutInfoPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Postal Code is required');
  });
});
