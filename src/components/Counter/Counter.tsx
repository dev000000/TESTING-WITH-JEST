// Author: TrungQuanDev: https://youtube.com/@trungquandev
import React from "react"
import { Button } from "~/components/Button/Button"

// Component Counter có nhiệm vụ tăng/giảm giá trị, tuy nhiên không được phép giảm xuống số âm.
export const Counter: React.FC = () => {
  const [value, setValue] = React.useState(0)

  return (
    <div>
      <p>Count: {value}</p>
      <Button
        content="+"
        onClick={() => setValue((v) => v + 1)}
      />
      <Button
        content="-"
        /* So sánh giữa 0 và v-1, lấy số lớn hơn, đảm bảo không âm. */
        onClick={() => setValue((v) => Math.max(0, v - 1))}
      />
    </div>
  )
}
