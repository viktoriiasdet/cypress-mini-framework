import JsAlertsPage from '../../pages/herokuapp/JsAlertsPage';

describe('Herokuapp - JavaScript Alerts', () => {
  beforeEach(() => {
    JsAlertsPage.visit();
  });

  it('handles JS Alert (window:alert)', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.eq('I am a JS Alert');
    });

    JsAlertsPage.clickJsAlert();
    JsAlertsPage.assertResult('You successfully clicked an alert');
  });

  it('handles JS Confirm (accept)', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('I am a JS Confirm');
      return true;
    });

    JsAlertsPage.clickJsConfirm();
    JsAlertsPage.assertResult('You clicked: Ok');
  });

  it('handles JS Confirm (dismiss)', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('I am a JS Confirm');
      return false;
    });

    JsAlertsPage.clickJsConfirm();
    JsAlertsPage.assertResult('You clicked: Cancel');
  });

  it('handles JS Prompt (stub prompt and accept)', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('QA Rocks');
    });

    JsAlertsPage.clickJsPrompt();
    JsAlertsPage.assertResult('You entered: QA Rocks');
  });
});
