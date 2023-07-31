import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

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

it("display correct band name for band existed at build time", () => {
    cy.task("db:reset").visit("/bands/1");
    cy.findByRole("heading", { name: /shamrock pete/i }).should('exist');
});

it("display error message for band not existed", () => {
    cy.task("db:reset").visit("/bands/5");
    cy.findByRole("heading", { name: /error: band not found/i }).should('exist');
});

it("display correct band name for band added after build time", () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
    cy.findByRole("heading", { name: /avalanche of cheese/i }).should('exist');
});
