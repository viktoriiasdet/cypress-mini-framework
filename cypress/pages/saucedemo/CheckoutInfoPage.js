class CheckoutInfoPage {
  firstName = '[data-test="firstName"]';
  lastName = '[data-test="lastName"]';
  postalCode = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  errorMessage = '[data-test="error"]';

  fill(customer) {
    cy.get(this.firstName).clear().type(customer.firstName);
    cy.get(this.lastName).clear().type(customer.lastName);
    cy.get(this.postalCode).clear().type(customer.postalCode);
  }

  continue() {
    cy.get(this.continueButton).click();
  }
}

export default new CheckoutInfoPage();
