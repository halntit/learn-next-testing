it("skip client bundle, confirming data from ISR cache", () => {
    // ref: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
    cy.request("/bands")
        .its("body")
        .then(html => {
            // remove the scripts so they don't start automatically
            const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
            cy.state('document').write(staticHtml);
        });

    cy.findAllByRole("heading", { name: /the wandering bunnies/i }).should("exist");
    cy.findAllByRole("heading", { name: /shamrock pete/i }).should("exist");
    cy.findAllByRole("heading", { name: /the joyous nun riot/i }).should("exist");
});