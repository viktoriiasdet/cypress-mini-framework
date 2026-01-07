import LoginPage from '../../pages/herokuapp/LoginPage';

describe('Herokuapp - Login (fixture-driven)', () => {
  it('logs in successfully with valid credentials', () => {
    cy.loginHerokuAs('validUser');
    LoginPage.assertFlashContains('You logged into a secure area!');
  });

  it('shows error for invalid password', () => {
    cy.loginHerokuAs('invalidPasswordUser');
    LoginPage.assertFlashContains('Your password is invalid!');
  });

  it('shows error for invalid username', () => {
    cy.loginHerokuAs('invalidUsernameUser');
    LoginPage.assertFlashContains('Your username is invalid!');
  });

  it('logs out successfully', () => {
    cy.loginHerokuAs('validUser');
    LoginPage.assertFlashContains('You logged into a secure area!');

    cy.get(LoginPage.logoutButton).click();
    LoginPage.assertFlashContains('You logged out of the secure area!');
  });
});
