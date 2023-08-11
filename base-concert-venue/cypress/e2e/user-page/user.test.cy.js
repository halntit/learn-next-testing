describe("User", () => {

    it("signin using email and password, enter user page and click purchase", () => { 
        cy.task("db:reset").signIn(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_PASSWORD"));
        cy.visit("/user");

        cy.findByRole("button", {
            name: /purchase/i
        }).click();

        cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
    });

});
