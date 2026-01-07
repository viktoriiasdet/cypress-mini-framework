class JsAlertsPage {
  result = '#result';

  visit() {
    cy.visitHerokuPage('/javascript_alerts');
  }

  clickJsAlert() {
    cy.contains('button', 'Click for JS Alert').click();
  }

  clickJsConfirm() {
    cy.contains('button', 'Click for JS Confirm').click();
  }

  clickJsPrompt() {
    cy.contains('button', 'Click for JS Prompt').click();
  }

  assertResult(text) {
    cy.get(this.result).should('contain.text', text);
  }
}

export default new JsAlertsPage();
