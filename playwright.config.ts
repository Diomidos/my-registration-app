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

  // Запуск сервера перед тестами
  webServer: {
    // В CI: собираем и запускаем preview, локально: dev-сервер
    command: process.env.CI 
      ? 'npm run build && npm run preview'  // для CI
      : 'npm run dev',                        // для локальной разработки
    url: process.env.CI ? 'http://localhost:4173' : 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // увеличиваем таймаут для CI до 120 секунд
    stdout: 'pipe',
    stderr: 'pipe',
  },
});