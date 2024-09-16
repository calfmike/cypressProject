// cypress/e2e/integration/userApp/transfers/transferToOwnAccount.spec.js

describe("UserApp Transfer Test", () => {
    beforeEach(() => {
      // Leer el token guardado desde el archivo session.json
      cy.readFile('cypress/fixtures/session.json').then((session) => {
        // Restauramos el token en localStorage
        cy.window().then((window) => {
          window.localStorage.setItem("token", session.token);
          cy.log('Token restaurado:', session.token);
        });
      });
    });
  
    it("should complete a transfer between accounts", () => {
      // Ya estamos logueados, navegamos directamente a la página de transacciones
      cy.visit("/transactions");
  
      // Verificar que estamos en la página de transacciones
      cy.url().should("include", "/transactions");
  
      // Seleccionar la cuenta de origen
      cy.get("label").contains("Select Account").parent().find(".MuiSelect-select").click();
      cy.get("li").contains("Savings").click();
  
      // Seleccionar "Transfer" en el tipo de movimiento
      cy.get("label").contains("Transaction Type").parent().find(".MuiSelect-select").click();
      cy.get("li").contains("Transfer").click();
  
      // Seleccionar "Own Account" en el tipo de transferencia
      cy.get("label").contains("Transfer Type").parent().find(".MuiSelect-select").click();
      cy.get("li").contains("Own").click(); 
  
      // Seleccionar la cuenta de destino
      cy.get("label").contains("Target Account").parent().find(".MuiSelect-select").click();
      cy.get("li").contains("Checking").click();
  
      // Ingresar el monto
      cy.get('label').contains('Amount').parent().find('input').type("100");
  
      // Completar la transferencia
      cy.get('button[type="submit"]').click();
  
      // Verificar el mensaje de éxito
      cy.wait(1000);
      cy.get('h4').parent().contains('Successful');
    });
  });
  