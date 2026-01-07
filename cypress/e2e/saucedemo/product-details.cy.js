import ProductsPage from '../../pages/saucedemo/ProductsPage';
import ProductDetailsPage from '../../pages/saucedemo/ProductDetailsPage';

// High-signal: verifies navigation, details page “contract”, and cart state from details page.

describe('Product details', () => {
  beforeEach(() => {
    cy.loginAs(); // or cy.loginAsValidUser()
    cy.url().should('include', '/inventory');
  });

  it('should open product details and go back to inventory', () => {
    const itemName = 'Sauce Labs Backpack';

    ProductsPage.openDetailsByName(itemName);

    // URL for details is typically /inventory-item.html?id=...
    cy.url().should('include', '/inventory-item.html');

    ProductDetailsPage.assertLoaded();

    // Back should return us to inventory
    ProductDetailsPage.backToProducts();
    cy.url().should('include', '/inventory');
  });

  it('should add to cart from product details and show badge', () => {
    const itemName = 'Sauce Labs Backpack';

    ProductsPage.openDetailsByName(itemName);
    ProductDetailsPage.assertLoaded();

    // Start: badge should be 0 (or absent)
    ProductsPage.getCartBadgeCount().should('equal', 0);

    // Add from details
    ProductDetailsPage.addToCart();

    // Badge should now be 1 (still visible on details page)
    ProductsPage.getCartBadgeCount().should('equal', 1);

    // Remove from details (optional state check)
    ProductDetailsPage.clickRemove();
    ProductsPage.getCartBadgeCount().should('equal', 0);
  });
});
