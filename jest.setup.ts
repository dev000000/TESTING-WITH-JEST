// Author: TrungQuanDev: https://youtube.com/@trungquandev
// Import thêm các custom matchers để tiện cho việc viết test, gọi file này ở jest.config.ts. Cũng như thêm cấu hình vào types trong tsconfig.app.json
import '@testing-library/jest-dom'

// File này về sau có thể cấu hình thêm global mock (như mock fetch hoặc mock localStorage...vv) tùy dự án

// Chạy 1 lần trước toàn bộ các test
beforeAll(() => {
  // Ví dụ mock fetch toàn cục
  globalThis.fetch = jest.fn()
  // Ghi đè console.error, warn, log, cho toàn bộ test, tránh hiện log khi chạy test, đỡ khó chịu
  console.error = jest.fn()
  console.warn = jest.fn()
  console.log = jest.fn() // tùy dự án nếu không cần có thể comment lại
})

// Chạy sau mỗi test case
afterEach(() => {
  // reset mỗi test để không bị ảnh hưởng giữa các test
  (fetch as jest.Mock).mockReset()
  // Xóa lịch sử call mock
  jest.clearAllMocks()
  // Reset cache của module require/import (require)
  jest.resetModules()
  // Restore tất cả spyOn về implementation gốc
  jest.restoreAllMocks()
})
