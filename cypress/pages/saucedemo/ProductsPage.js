class ProductsPage {
  title = '[data-test="title"]';
  inventoryItem = '[data-test="inventory-item"]';
  sortSelect = '[data-test="product-sort-container"]';
  cartLink = '[data-test="shopping-cart-link"]';
  cartBadge = '[data-test="shopping-cart-badge"]';

  itemName = '[data-test="inventory-item-name"]';
  itemPrice = '[data-test="inventory-item-price"]';

  addToCartButtonByName(name) {
    return cy.contains(this.itemName, name)
      .parents(this.inventoryItem)
      .find('button');
  }

  openCart() {
    cy.get(this.cartLink).click();
  }

  selectSort(value) {
    cy.get(this.sortSelect).select(value);
  }

  getItemPrices() {
    return cy.get(this.itemPrice).then($els =>
      [...$els].map(el => Number(el.innerText.replace('$', '').trim()))
    );
  }

  getCartBadgeCount() {
    return cy.get('body').then($body => {
      if ($body.find(this.cartBadge).length === 0) return 0;
      const txt = $body.find(this.cartBadge).text();
      return Number(txt);
    });
  }

  openDetailsByName(name) {
    // Clicking product name navigates to details page.
    cy.contains(this.itemName, name).click();
  }
}

export default new ProductsPage();
