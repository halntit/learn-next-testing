it("displays correct heading when navigating to shows", () => {
    cy.visit("/"); // visit base-concert-venue
    cy.findByRole("button", {
        name: /shows/i
    }).click(); // don't need to "await", it automatically waits for page to load
    cy.findByRole("heading", {
        name: /upcoming shows/i
    }).should('exist');
});

it("displays correct heading when navigating to bands", () => {
    cy.visit("/");
    cy.findByRole("button", {
        name: /bands/i
    }).click();
    cy.findByRole("heading", {
        name: /Our Illustrious Performers/i
    }).should('exist');
});

it ("reset the DB", () => {
    cy.task("db:reset");
});