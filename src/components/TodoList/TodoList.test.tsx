import { TodoList } from "~/components/TodoList/TodoList";
import { render, screen } from "@testing-library/react";

const mockTodos = [
  {
    id: 1,
    todo: "Do something nice for someone you care about",
    completed: false,
    userId: 152,
  },
  {
    id: 2,
    todo: "Memorize a poem",
    completed: true,
    userId: 13,
  },
];
describe("TodoList Component", () => {
  it("Fetch and display todos", async () => {
    // mock fetch API
    // mockResolvedValueOnce: lan goi tiep theo se tra ve Promise.Resolved voi gia tri ben duoi
    jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ todos: mockTodos }),
    } as any);

    // render
    render(<TodoList></TodoList>);

    // check loading state
    // getByText: chay dong bo(synchronous) dung khi chac chan element da co san trong DOM
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // wait for the todos to be displayed
    for (const t of mockTodos) {
      // findByText: chay bat dong bo(asynchronous) dung khi khong chac chan element da co san trong DOM
      expect(await screen.findByText(t.todo)).toBeInTheDocument();
    }
  });
  it("Fetch but error and display No result!", async () => {
    // mock fetch API
    // mockRejectedValueOnce: lan goi tiep theo se tra ve Promise.Rejected voi gia tri ben duoi
    jest.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("API error"));

    // render
    render(<TodoList></TodoList>);

    // check loading state
    // getByText: chay dong bo(synchronous) dung khi chac chan element da co san trong DOM
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // expect No result! to be displayed
    expect(await screen.findByText(/no result/i)).toBeInTheDocument();
  });
});
