class CheckboxesPage {
  checkboxes = '#checkboxes input[type="checkbox"]';

  visit() {
    cy.visitHerokuPage('/checkboxes');
  }

  checkbox(index) {
    return cy.get(this.checkboxes).eq(index);
  }
}

export default new CheckboxesPage();
