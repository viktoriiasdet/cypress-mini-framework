class DropdownPage {
  dropdown = '#dropdown';

  visit() {
    cy.visitHerokuPage('/dropdown');
  }

  selectByValue(value) {
    cy.get(this.dropdown).select(value);
  }

  assertSelected(value) {
    cy.get(this.dropdown).should('have.value', value);
  }
}

export default new DropdownPage();
