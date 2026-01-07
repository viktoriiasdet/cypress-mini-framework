import DropdownPage from '../../pages/herokuapp/DropdownPage';

describe('Herokuapp - Dropdown', () => {
  beforeEach(() => {
    DropdownPage.visit();
  });

  it('should select option 1', () => {
    DropdownPage.selectByValue('1');
    DropdownPage.assertSelected('1');
  });

  it('should select option 2', () => {
    DropdownPage.selectByValue('2');
    DropdownPage.assertSelected('2');
  });
});
