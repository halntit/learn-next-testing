import { rest } from "msw"; // Mock Service Worker
import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { fakeUserReservations } from "@/__tests__/__mocks__/fakeData/userReservations";

export const handlers = [
    rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
        const { fakeShows } = await readFakeData();
        return res(ctx.json({ show: fakeShows[0] }));
    }),

    rest.get("http://localhost:3000/api/users/:userId/reservations", async (req, res, ctx) => {
        // note: implicit return here
        return res(ctx.json({ userReservations: fakeUserReservations }));
    })
];
