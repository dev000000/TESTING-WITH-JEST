import { Counter } from "~/components/Counter/Counter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Counter Component", () => {
  it("Should render the counter component and count not be negative", async () => {
    const user = userEvent.setup();
    render(<Counter></Counter>);

    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });

    // An click vao button tang 3 lan => count = 3
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    // An click vao button giam 4 lan => count van phai la 0 (khong am)
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);

    // Kiem tra count hien thi tren UI
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
});
