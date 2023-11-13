const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,  
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    excludeSpecPattern: ['**/cypress/e2e/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,cy}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
