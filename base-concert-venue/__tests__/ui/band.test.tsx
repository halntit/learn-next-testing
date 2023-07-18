import { render, screen } from "@testing-library/react";
import BandComponent from "@/pages/bands/[bandId]";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

test("band component display correct band information", async () => {
    const { fakeBands } = await readFakeData();
    render(<BandComponent error={null} band={fakeBands[0]} />);

    const heading = screen.getByRole("heading", {
        name: /the wandering bunnies/i,
    });
    expect(heading).toBeInTheDocument();

    // should write more tests here
});

test("band component display error", async () => {
    render(<BandComponent error={ "Error occurred" } band={null} />);

    const error = screen.getByRole("heading", {
        name: /error occurred/i,
    });
    expect(error).toBeInTheDocument();

    // should write more tests here
});
