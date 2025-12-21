import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest', // Dùng ts-jest để biên dịch TypeScript khi chạy test.
  testEnvironment: 'jsdom', // Mặc định Jest chạy trong môi trường Node.js, nhưng React component cần DOM API (như document, window, HTML Element...). Nên chúng ta cần jsdom giả lập trình duyệt trong Node, giúp test React component.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Khai báo file jest.setup.ts sẽ chạy sau khi Jest khởi tạo môi trường test ENV.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  }, // ánh xạ alias khi import module. Cannot find module '~/...' khi chạy test
  // $1 ý nghĩa là phần còn lại sau './src/...'
}

export default config
