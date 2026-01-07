import ProductsPage from '../../pages/saucedemo/ProductsPage';
import CartPage from '../../pages/saucedemo/CartPage';
import CheckoutInfoPage from '../../pages/saucedemo/CheckoutInfoPage';
import CheckoutOverviewPage from '../../pages/saucedemo/CheckoutOverviewPage';
import CheckoutCompletePage from '../../pages/saucedemo/CheckoutCompletePage';

describe('Checkout - happy path', () => {

  /*beforeEach(function () {
    cy.fixture('users').as('users');
    cy.fixture('checkout').as('checkout');
    cy.login(this.users.validUser.username, this.users.validUser.password);
    cy.url().should('include', '/inventory');
  });
  */

  beforeEach(() => {
    cy.fixture('users').then((users) => {
      cy.login(users.validUser.username, users.validUser.password);
    });

    cy.url().should('include', '/inventory');
  });

  it('should complete checkout and validate totals', () => {
    const itemName = 'Sauce Labs Backpack';

    // Add item to cart
    ProductsPage.addToCartButtonByName(itemName).click();
    ProductsPage.getCartBadgeCount().should('equal', 1);

    // Go to cart
    ProductsPage.openCart();
    cy.url().should('include', '/cart.html');

    // Checkout
    CartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');

    // Fill checkout info
    cy.fixture('checkout').then((checkout) => {
      CheckoutInfoPage.fill(checkout.customer);
      CheckoutInfoPage.continue();
    });

    // Checkout overview
    cy.url().should('include', '/checkout-step-two.html');

    // ===== VALIDATE TOTALS (CORRECT CYPRESS WAY) =====
    let itemTotal;
    let tax;

    CheckoutOverviewPage.getItemTotalNumber()
      .then((value) => {
        itemTotal = value;
        expect(itemTotal, 'itemTotal').to.be.a('number');
      })
      .then(() => CheckoutOverviewPage.getTaxNumber())
      .then((value) => {
        tax = value;
        expect(tax, 'tax').to.be.a('number');
      })
      .then(() => CheckoutOverviewPage.getTotalNumber())
      .then((total) => {
        expect(total, 'total').to.be.a('number');
        expect(total).to.be.closeTo(itemTotal + tax, 0.01);
      });

    // Finish checkout
    CheckoutOverviewPage.finish();

    // Complete page
    cy.url().should('include', '/checkout-complete.html');
    CheckoutCompletePage.assertComplete();
  });
});