//////////////////////////////////////////
//               SAUCE DEMO              //
//////////////////////////////////////////

/**
 * Low-level login (does the actual UI steps).
 * Keep it simple and deterministic.
 */
Cypress.Commands.add('login', (username, password) => {
  expect(username, 'username').to.be.a('string').and.not.be.empty;
  expect(password, 'password').to.be.a('string').and.not.be.empty;

  cy.visit('/');

  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

/**
 * High-level login using fixtures.
 * Usage: cy.loginAs() or cy.loginAs('lockedUser')
 *
 * Note: We use cy.fixture().then(...) instead of Mocha `this` aliases
 * because fixture load is queued async in Cypress.
 */
Cypress.Commands.add('loginAs', (userKey = 'validUser') => {
  cy.fixture('users').then((users) => {
    const user = users[userKey];

    expect(user, `User key "${userKey}" in users fixture`).to.exist;
    expect(user.username, 'username').to.be.a('string').and.not.be.empty;
    expect(user.password, 'password').to.be.a('string').and.not.be.empty;

    cy.login(user.username, user.password);
  });
});

/**
 * Optional: cached login via cy.session (Cypress 12+).
 * Speeds up suites significantly because Cypress can reuse the session.
 *
 * Usage: cy.loginAsSession() or cy.loginAsSession('validUser')
 *
 * If you don't want session caching, you can delete this block.
 * If you use loginAsSession(), call it in beforeEach() and then start tests directly on /inventory.
 */
Cypress.Commands.add('loginAsSession', (userKey = 'validUser') => {
  cy.fixture('users').then((users) => {
    const user = users[userKey];

    expect(user, `User key "${userKey}" in users fixture`).to.exist;

    cy.session(
      ['saucedemo', userKey, user.username],
      () => {
        cy.login(user.username, user.password);
        cy.url().should('include', '/inventory');
      },
      {
        // Quick validation that session is still valid
        validate() {
          cy.visit('/inventory.html');
          cy.url().should('include', '/inventory');
        }
      }
    );
  });
});

//////////////////////////////////////////
//                 HEROKU               //
//////////////////////////////////////////

/**
 * Visit Heroku app using env variable (secondary base URL).
 * Requires cypress.config.js -> env.herokuBaseUrl
 */
Cypress.Commands.add('visitHeroku', (path = '/') => {
  const base = Cypress.env('herokuBaseUrl');

  // Helpful error message if env is missing
  expect(base, 'Cypress.env("herokuBaseUrl")')
    .to.be.a('string')
    .and.not.be.empty;

  // Normalize path to start with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  cy.visit(base + normalizedPath);
});

/**
 * Generic helper to visit any Heroku page by path
 * Usage: cy.visitHerokuPage('/checkboxes')
 */
Cypress.Commands.add('visitHerokuPage', (path) => {
  expect(path, 'path').to.be.a('string').and.not.be.empty;
  cy.visitHeroku(path);
});

/**
 * Fixture-driven Heroku login.
 * Usage: cy.loginHerokuAs() or cy.loginHerokuAs('invalidPasswordUser')
 *
 * Fixture file: cypress/fixtures/heroku-users.json
 */
Cypress.Commands.add('loginHerokuAs', (userKey = 'validUser') => {
  cy.fixture('heroku-users').then((users) => {
    const user = users[userKey];

    expect(user, `User key "${userKey}" in heroku-users fixture`).to.exist;
    expect(user.username, 'username').to.be.a('string').and.not.be.empty;
    expect(user.password, 'password').to.be.a('string').and.not.be.empty;

    cy.visitHeroku('/login');
    cy.get('#username').clear().type(user.username);
    cy.get('#password').clear().type(user.password);
    cy.get('button[type="submit"]').click();
  });
});

/**
 * Optional helper: load any fixture and return it (keeps specs clean)
 * Usage: cy.loadFixture('heroku-users').then(...)
 */
Cypress.Commands.add('loadFixture', (name) => {
  expect(name, 'fixture name').to.be.a('string').and.not.be.empty;
  return cy.fixture(name);
});
