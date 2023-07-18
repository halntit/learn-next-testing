import { render, screen } from "@testing-library/react";
import Home from '@/pages/index';

it("page has correct heading and image", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
        name: /Welcome to Popular Concert Venue/i,
    });
    expect(heading).toBeInTheDocument();

    const image = screen.getByRole('img', {
        name: /concert goer with hands in the shape of a heart/i,
    });
    expect(image).toBeInTheDocument();
});
