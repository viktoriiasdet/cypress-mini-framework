// ProductDetailsPage represents the product details screen (after clicking an item name).
// We keep selectors here so tests remain clean and resilient.

class ProductDetailsPage {
  name = '[data-test="inventory-item-name"]';
  price = '[data-test="inventory-item-price"]';
  description = '[data-test="inventory-item-desc"]';

  addToCartButton = '.inventory_details_desc_container button[data-test="add-to-cart"]';
  removeButton = '.inventory_details_desc_container button[data-test="remove"]';

  backToProductsButton = '[data-test="back-to-products"]';

  // Useful assertion: validates details page looks loaded (basic “contract”)
  assertLoaded() {
    cy.get(this.name).should('be.visible');
    cy.get(this.price).should('be.visible');
    cy.get(this.description).should('be.visible');
  }

  addToCart() {
    // On details page, the button is "Add to cart" initially
    cy.get(this.addToCartButton).click();
  }

  removeFromCart() {
    cy.get(this.removeButton).click();
  }

  backToProducts() {
    cy.get(this.backToProductsButton).click();
  }

  clickRemove() {
    cy.get(this.removeButton).should('have.length', 1).click();
  }
}

export default new ProductDetailsPage();
