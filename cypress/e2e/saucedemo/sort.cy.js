import ProductsPage from '../../pages/saucedemo/ProductsPage';

describe('Inventory sorting', () => {

  /*beforeEach(() => {
    cy.fixture('users').as('users');
    cy.login(this.users.validUser.username, this.users.validUser.password);
    cy.url().should('include', '/inventory');
  });
  */
  /* Two issues at once:
     You used an arrow function () => {} → Mocha this is not bound, so this is undefined
     Even with function () {}, the alias isn’t ready immediately
     Fix = don’t use this here at all. Load fixture with .then.
     */

  beforeEach(() => {
      cy.fixture('users').then((users) => {
        cy.login(users.validUser.username, users.validUser.password);
      });

      cy.url().should('include', '/inventory');
    });

  it('should sort by price low to high', () => {
    ProductsPage.selectSort('lohi');

    ProductsPage.getItemPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });
});
