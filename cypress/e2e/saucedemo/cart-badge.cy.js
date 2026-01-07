import ProductsPage from '../../pages/saucedemo/ProductsPage';

describe('Cart badge', () => {
//  beforeEach(function () {
//    cy.fixture('users').as('users');
//
//    //cy.login(this.users.validUser.username, this.users.validUser.password);    //Even though I used function () {} (which is correct for Mocha this), the alias is only assigned later in the Cypress command queue, not instantly.
//
//    cy.get('@users').then((users) => {
//        cy.login(users.validUser.username, users.validUser.password);
//      });
//
//   //Cypress.Commands.add('loginAs', (user) => cy.login(user.username, user.password));    // even more stable version -> cy.login() accepts user objects:
//
//    cy.url().should('include', '/inventory');
//  });

  beforeEach(() => {
    cy.loginAs();
    cy.url().should('include', '/inventory');
  });

  it('should increment and decrement cart badge', () => {
    const firstItem = 'Sauce Labs Backpack';
    const secondItem = 'Sauce Labs Bike Light';

    ProductsPage.getCartBadgeCount().should('equal', 0);

    ProductsPage.addToCartButtonByName(firstItem).click();
    ProductsPage.getCartBadgeCount().should('equal', 1);

    ProductsPage.addToCartButtonByName(secondItem).click();
    ProductsPage.getCartBadgeCount().should('equal', 2);

    // Remove first item (button toggles to "Remove")
    ProductsPage.addToCartButtonByName(firstItem).click();
    ProductsPage.getCartBadgeCount().should('equal', 1);
  });
});
