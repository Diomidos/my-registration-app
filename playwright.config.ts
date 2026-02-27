import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './PlaywrightTests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // генерирует HTML-отчет
  
  use: {
    baseURL: 'http://localhost:3000', // URL моего dev-сервера
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

  // Запуск dev-сервера перед тестами
  webServer: {
    command: 'npm run dev', // команда запуска проекта
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});