class CartPage {
  cartItem = '[data-test="cart-item"]';
  itemName = '[data-test="inventory-item-name"]';
  itemPrice = '[data-test="inventory-item-price"]';

  checkoutButton = '[data-test="checkout"]';
  continueShoppingButton = '[data-test="continue-shopping"]';

  removeButtonByName(name) {
    return cy.contains(this.itemName, name)
      .parents(this.cartItem)
      .find('button')
      .contains(/remove/i);
  }

  checkout() {
    cy.get(this.checkoutButton).click();
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click();
  }
}

export default new CartPage();
