Cypress.Commands.add("login", (username, password) => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(500); // Esperar un poco para que el token se guarde
  });
  
  // Comando para cerrar sesión
  Cypress.Commands.add("logout", () => {
    // Eliminar el token del localStorage
    cy.window().then((window) => {
      window.localStorage.removeItem("token");
    });
    cy.visit("/login"); // Redirigir al login después de cerrar sesión
  });