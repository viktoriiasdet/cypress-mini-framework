class DynamicLoadingPage {
  startButton = '#start button';
  loadingBar = '#loading';
  finishText = '#finish';

  visitExample(exampleNumber) {
    cy.visitHerokuPage(`/dynamic_loading/${exampleNumber}`);
  }

  start() {
    cy.get(this.startButton).click();
  }

  waitForLoadingToFinish() {
    cy.get(this.loadingBar, { timeout: 10000 }).should('not.be.visible');
  }

  assertFinishedText(expectedText) {
    cy.get(this.finishText, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', expectedText);
  }
}

export default new DynamicLoadingPage();
