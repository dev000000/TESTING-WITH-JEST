import { renderHook, act } from "@testing-library/react";
import { useCounter } from "~/hooks/useCounter";

// renderHook: render mot custom hook trong moi truong test, ko can tao component that
// act: dam bao moi cap nhat state va side effect trong scope cua no du sync hoac async deu duoc xu li xong het truoc khi test kiem tra ket qua
describe("useCounter hook", () => {
  it("Should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  it("Should initialize with provided initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });
  it("Should increment the count", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
    it("Should decrement the count but count should not go below 0", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
  it("Should decrement the count", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });
  it("Should reset the count", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });


});