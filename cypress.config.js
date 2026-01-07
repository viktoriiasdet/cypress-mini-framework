import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Primary application under test
    baseUrl: "https://www.saucedemo.com",
    // Secondary apps / environments
    env: {
      herokuBaseUrl: "https://the-internet.herokuapp.com"
    },
    /*Cypress supports only one baseUrl,
    so I keep the primary application there and expose secondary applications via environment variables.
    This keeps the configuration stable and avoids manual toggling.*/
    viewportWidth: 1280,
    viewportHeight: 800,

    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // future hooks (reports, env overrides, retries, etc.)
    }
  }
});
