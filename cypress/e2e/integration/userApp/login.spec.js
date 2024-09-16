// cypress/e2e/integration/userApp/login/login.spec.js

describe("UserApp Login and Sidebar Navigation Test", () => {
  it("should log in and store the token in localStorage", () => {
    cy.visit("/login");

    // Usar los datos del fixture para iniciar sesión
    cy.fixture("userData").then((data) => {
      cy.get('input[name="username"]').type(data.user.username);
      cy.get('input[name="password"]').type(data.user.password);
    });

    cy.get('button[type="submit"]').click();
    cy.wait(500); // Esperar un poco para que el token se guarde

    // Verificar que el token está guardado en localStorage y guardarlo en un archivo JSON
    cy.window().then((window) => {
      const token = window.localStorage.getItem("token");
      expect(token).to.exist;  // Asegurarnos de que el token esté presente

      // Guardamos el token en un archivo fixture para usarlo en futuras pruebas
      cy.writeFile('cypress/fixtures/session.json', { token: token });
    });

    // Redirigir manualmente al dashboard
    cy.visit("/");

    // Verificamos que el dashboard se cargue usando un elemento visible
    cy.get("h1", { timeout: 10000 }).should("be.visible").parent().contains("My User App");

    // Navegar al link de "Transactions" en el Sidebar
    cy.get("ul").contains("Transfer").scrollIntoView().click({ force: true });

    // Verificar que estamos en la página de transacciones
    cy.url().should("include", "/transactions");
  });
});
