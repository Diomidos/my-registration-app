import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './PlaywrightTests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    // В CI: собираем и запускаем через serve
    // Локально: dev-сервер
    command: process.env.CI 
      ? 'npm run build && npx serve -s build -l 3000'  // для CRA
      : 'npm run dev',                                   // для локальной разработки
    url: 'http://localhost:3000',                        // единый порт для всех
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 120 секунд на сборку и запуск
    stdout: 'pipe',
    stderr: 'pipe',
  },
});