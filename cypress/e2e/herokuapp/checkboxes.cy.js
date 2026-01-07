import CheckboxesPage from '../../pages/herokuapp/CheckboxesPage';

describe('Herokuapp - Checkboxes (edge cases)', () => {
  beforeEach(() => {
    CheckboxesPage.visit();
  });

  it('should allow checking and unchecking', () => {
    CheckboxesPage.checkbox(0).should('not.be.checked');
    CheckboxesPage.checkbox(1).should('be.checked'); // default state

    CheckboxesPage.checkbox(0).check().should('be.checked');
    CheckboxesPage.checkbox(1).uncheck().should('not.be.checked');
  });
});
