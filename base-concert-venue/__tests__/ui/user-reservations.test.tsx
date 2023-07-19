import { UserReservations } from "@/components/user/UserReservations";
import { render, screen } from "@testing-library/react";

describe("test user reservations", () => {
    it("Displays reservation details and purchase more button", async () => {
        render(<UserReservations userId={1} />);

        const purchaseButton = await screen.findByRole("button", {
            name: /purchase more tickets/i,
        });
        expect(purchaseButton).toBeInTheDocument();
    }),

    it("Displays NO reservations and purchase button", async () => {
        render(<UserReservations userId={0} />);

        const purchaseText = await screen.queryByRole("button", {
            name: /Your tickets/i
        });
        expect(purchaseText).not.toBeInTheDocument();

        const purchaseButton = await screen.findByRole("button", {
            name: /purchase tickets/i,
        });
        expect(purchaseButton).toBeInTheDocument();
    })
});
