import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DebounceSearch Component", () => {
  it("Should fetch list user after debounce", async () => {
    // 1. tao mock user de gia lap su kien nguoi dung tuong tac
    const user = userEvent.setup();
    // 2. mock fetch
    jest.spyOn(globalThis, "fetch").mockImplementation( async (url: any ) => {
      if ( url.includes("john") ) {
        return { json: async () => [{ id: 1, name: "John Doe" }] } ;
      }
      return { json: async () => [] } as any ;
    });
    // 3. render DebounceSearch
    render(<DebounceSearch />);
    // 4. check fetch dc goi lan dau de load user
    expect(globalThis.fetch).toHaveBeenCalledTimes(1); // fetch lan dau de load user
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("users?q="));
    // 5. nhap gia tri vao input de tim kiem
    await user.type(screen.getByPlaceholderText(/search/i), "john");
    // 6. kiem tra fetch dc goi van chi 1 lan (do debounce chua het thoi gian)
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    // 7. kiem tra ket qua tim kiem sau khi debounce het thoi gian
    expect( await screen.findByText("John Doe") ).toBeInTheDocument();
    // 8. kiem tra fetch dc goi them lan nua sau khi debounce het thoi gian
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("users?q=john"));
  });
  it("Should show No result! when call api error", async () => {
    // 1. mock fetch
    jest.spyOn(globalThis, "fetch").mockRejectedValueOnce( new Error("API error") );
    // 2. render DebounceSearch
    render(<DebounceSearch />);
    // 3. check loading ....
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    // 4. check No result! sau khi fetch bi loi
    expect( await screen.findByText(/no result!/i) ).toBeInTheDocument();
  });
});
