import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("should load refreshed from cache after new band is added", () => {
    // check the band name is not on the page
    cy.task("db:reset").visit("/bands");
    cy.findByRole("heading", { name: /avalanche of cheese/i }).should("not.exist");

    // add new band via POST request to API
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    const secret = Cypress.env("REVALIDATION_SECRET");
    cy.request("POST", `/api/bands?secret=${secret}`, { newBand: newBand })
        .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.band.name).to.eq(newBand.name);
            expect(res.body.revalidated).to.eq(true);
        });

    // reload the page; the band name should be on the page
    cy.reload();
    cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

    // clear isr cache to initial db conditions
    cy.resetDBAndClearISRCache();
});
