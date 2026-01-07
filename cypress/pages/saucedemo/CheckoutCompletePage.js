class CheckoutCompletePage {
  completeHeader = '[data-test="complete-header"]';
  completeText = '[data-test="complete-text"]';
  backHomeButton = '[data-test="back-to-products"]';

  assertComplete() {
    cy.get(this.completeHeader).should('be.visible');
  }

  backHome() {
    cy.get(this.backHomeButton).click();
  }
}

export default new CheckoutCompletePage();
