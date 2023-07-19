import { rest } from "msw"; // Mock Service Worker
import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { fakeUserReservations } from "@/__tests__/__mocks__/fakeData/userReservations";

export const handlers = [
    rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
        const { showId } = req.params;
        const { fakeShows } = await readFakeData();
        return res(ctx.json({ show: fakeShows[Number(showId)] }));
    }),

    rest.get("http://localhost:3000/api/users/:userId/reservations", async (req, res, ctx) => {
        const { userId } = req.params;
        if (userId === "0") { // user without any reservations
            return res(ctx.json([]));
        } else {
            // note: implicit return here
            return res(ctx.json({ userReservations: fakeUserReservations }));
        }
    })
];
