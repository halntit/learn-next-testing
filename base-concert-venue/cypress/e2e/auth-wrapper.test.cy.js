

it("runs auth flow for failed then succesfully login", async () => {
    // visit protected page
    cy.task("db:reset").visit("/user");

    // check that login form is displayed
    cy.findByRole("heading", {
        name: /sign in to your account/i
    }).should('exist');

    // check that there's no welcome message
    cy.findByRole("heading", {
        name: /welcome/i
    }).should('not.exist');

    // sign in with invalid credentials
    cy.findByLabelText(/email address/i)
        .clear()
        .type(Cypress.env("TEST_USER_EMAIL"));
    cy.findByLabelText(/password/i)
        .clear()
        .type("not real pwd");

    // submit the form
    cy.findByRole("main").within(() => {
        cy.findByRole("button", {
            name: /sign in/i
        }).click();
    });

    // failure message
    cy.findByText(/sign in failed/i).should('exist');

    // retry with real pws
    cy.findByLabelText(/password/i)
        .clear()
        .type(Cypress.env("TEST_PASSWORD"));

    // submit the form
    cy.findByRole("main").within(() => {
        cy.findByRole("button", {
            name: /sign in/i
        }).click();
    });

    // check for purchase button and band name
    cy.findByRole("button", {
        name: /purchase/i
    }).should('exist');
    cy.findByRole("heading", {
        name: /the wandering bunnies/i
    }).should('exist');

    // check that welcome message, email and sign-out button are displayed
    cy.findByRole("heading", () => {
        name: /welcome/i
    }).should('exist');
    cy.findByRole("button", {
        name: Cypress.env("TEST_USER_EMAIL")
    }).should('exist');
    cy.findByRole("button", {
        name: /sign out/i
    }).should('exist');
});
