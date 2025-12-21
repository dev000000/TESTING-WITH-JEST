import { useState } from "react";

export function useCounter(initialValue: number = 0) {
  // state data
  const [count, setCount] = useState(initialValue);
  // tang
  const increment = () => {setCount((prev) => prev + 1);};
  // giam
  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }
  //reset
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}