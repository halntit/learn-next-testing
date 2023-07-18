import { UserReservations } from "@/components/user/UserReservations";
import { render, screen } from "@testing-library/react";

test("Displays reservation details and purchase button", async () => {
    render(<UserReservations userId={1} />);

    const purchaseButton = await screen.findByRole("button", {
        name: /purchase more tickets/i,
    });
    expect(purchaseButton).toBeInTheDocument();
});
