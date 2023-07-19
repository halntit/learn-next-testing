import { render, screen } from "@testing-library/react";
import { Reservation } from "@/components/reservations/Reservation";

describe("Reservation", () => {
    it("shows correct number of seats", async () => {
        render(<Reservation showId={0} submitPurchase={jest.fn()} />);
        const seatCountText = await screen.findByText(/10 seats left/i);
        expect(seatCountText).toBeInTheDocument();
    })

    it("shows 'sold out' and NO purchase button", async () => {
        render(<Reservation showId={1} submitPurchase={jest.fn()} />);
        const seatSeatText = await screen.findByRole('heading', {
            name: /sold out/i
        });
        expect(seatSeatText).toBeInTheDocument();

        // user queryByRole when testing not found
        const purchaseButton = await screen.queryByRole('button', {
            name: /purchase/i,
        });
        expect(purchaseButton).not.toBeInTheDocument();
    })
});
