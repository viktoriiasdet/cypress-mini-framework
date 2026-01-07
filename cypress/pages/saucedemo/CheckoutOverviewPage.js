const extractNumber = (text) => {
  const match = text.match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : undefined;
};

class CheckoutOverviewPage {
  finishButton = '[data-test="finish"]';

  itemTotal = '[data-test="subtotal-label"]';
  tax = '[data-test="tax-label"]';
  total = '[data-test="total-label"]';

  finish() {
    cy.get(this.finishButton).click();
  }

  getItemTotalNumber() {
    return cy.get(this.itemTotal)
      .invoke('text')
      .then((t) => extractNumber(t));
  }

  getTaxNumber() {
    return cy.get(this.tax)
      .invoke('text')
      .then((t) => extractNumber(t));
  }

  getTotalNumber() {
    return cy.get(this.total)
      .invoke('text')
      .then((t) => extractNumber(t));
  }
}

export default new CheckoutOverviewPage();
