import { SignUpForm } from "~/components/SignUpForm/SignUpForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get } from "lodash";

describe("SignUpForm Component", () => {
  it("Should render default values in the sign-up form", () => {
    // 1. tao mock function for onSubmit
    const mockOnSubmit = jest.fn();
    // 2. render SignUpForm voi defaultValues
    render(
      <SignUpForm
        onSubmit={mockOnSubmit}
        defaultValues={{ email: "emailtest", password: "passwordtest" }}
      />
    );
    // 3. check gia tri cua email, password = default hay ko
    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue(
      "emailtest"
    );
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue(
      "passwordtest"
    );
    // 4. check ham onSubmit chua dc goi
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("Should show empty errors when submitting empty form", async () => {
    // 1. tao mock user de gia lap su kien nguoi dung tuong tac
    const user = userEvent.setup();
    // 2. tao mock function for onSubmit
    const mockOnSubmit = jest.fn();
    // 3. render SignUpForm
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    // 4. lay button submit
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // 5. click vao button submit ma khong nhap gi ca
    await user.click(submitButton);
    // 6 kiem tra loi hien thi tren UI
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    // 7 kiem tra ham onSubmit chua dc goi
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("Should show error when submitting form with invalid email", async () => {
    // 1. tao mock user de gia lap su kien nguoi dung tuong tac
    const user = userEvent.setup();
    // 2. tao mock function for onSubmit
    const mockOnSubmit = jest.fn();
    // 3. render SignUpForm
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    // 4. lay button submit
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // 5. nhap email khong hop le voi password hop le
    await user.type(
      screen.getByPlaceholderText(/enter email/i),
      "invalid-email"
    );
    await user.type(
      screen.getByPlaceholderText(/enter password/i),
      "validPassword123"
    );
    // 6. click vao button submit ma khong nhap gi ca
    await user.click(submitButton);
    // 7. kiem tra loi hien thi tren UI
    expect(screen.getByText(/email is not valid/i)).toBeInTheDocument();
    // 8. kiem tra ham onSubmit chua dc goi
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("Should show error when submitting form with invalid password - too short < 6 characters", async () => {
    // 1. tao mock user de gia lap su kien nguoi dung tuong tac
    const user = userEvent.setup();
    // 2. tao mock function for onSubmit
    const mockOnSubmit = jest.fn();
    // 3. render SignUpForm
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    // 4. lay button submit
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // 5. nhap email hop le voi password ko hop le
    await user.type(
      screen.getByPlaceholderText(/enter email/i),
      "abc@gmail.com"
    );
    await user.type(screen.getByPlaceholderText(/enter password/i), "231");
    // 6. click vao button submit ma khong nhap gi ca
    await user.click(submitButton);
    // 7. kiem tra loi hien thi tren UI
    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
    // 8. kiem tra ham onSubmit chua dc goi
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("Should submit form when submitting form with valid email and password", async () => {
    // 1. tao mock user de gia lap su kien nguoi dung tuong tac
    const user = userEvent.setup();
    // 2. tao mock function for onSubmit
    const mockOnSubmit = jest.fn();
    // 3. render SignUpForm
    render(<SignUpForm onSubmit={mockOnSubmit} />);
    // 4. lay button submit
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // 5. nhap email hop le voi password hop le
    await user.type(
      screen.getByPlaceholderText(/enter email/i),
      "abc@gmail.com"
    );
    await user.type(screen.getByPlaceholderText(/enter password/i), "1234567");
    // 6. click vao button submit ma khong nhap gi ca
    await user.click(submitButton);
    // 7. kiem tra ham onSubmit duoc goi voi form data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "abc@gmail.com",
      password: "1234567"
    });
    // 8. kiem tra form duoc reset sau khi submit
    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue("");
  });
});
