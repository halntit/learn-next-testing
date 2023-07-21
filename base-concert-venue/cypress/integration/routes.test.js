it("displays correct heading when navigating to shows", () => {
    cy.visit("/");
    cy.findByRole("button", {
        name: /shows/i
    }).click();
    cy.findByRole("heading", {
        name: /upcomming shows/i
    }).should('exist');
})
