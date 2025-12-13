import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "~/components/Button/Button";

describe("Button Component", () => {
  it("Should render the button and click to button", async () => {
    // Tao 1 user instance : gia lap 1 nguoi dung
    const user = userEvent.setup();
    // Tao mock function de kiem tra su kien click
    const onClick = jest.fn();
    // Mount component bang render vao DOM ao trong moi truong test
    render(<Button content="Click me" onClick={onClick}></Button>);
    // Tim kiem button vua render bang text
    // Dung object screen de truy van DOM global tim button
    // getByRole: tim kiem theo vai tro (role) cua the HTML
    // trong vi du role cua button la "button" , name=/click me/i (regular expression - khong phan biet hoa thuong)
    // name: tim kiem theo text hien thi tren button
    const button = screen.getByRole("button", { name: /click me/i });

    // nguoi dung click vao button
    await user.click(button);

    // kiem tra button van nam trong dom (khong bi unmount)
    expect(button).toBeInTheDocument();
    // kiem tra su kien click duoc goi dung 1 lan
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
