const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // URL de userApp
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}', // Ruta de tus pruebas
    setupNodeEvents(on, config) {
      // Puedes agregar eventos de Cypress aquí
    }
  }
});
