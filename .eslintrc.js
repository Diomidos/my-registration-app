module.exports = {
  // Мои основные настройки
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // другие расширения
  ],
  overrides: [
    {
      // Для всех файлов Playwright тестов
      files: ['**/tests/**/*.spec.ts', '**/e2e/**/*.ts', '**/*.spec.ts'],
      rules: {
        // Отключаем правила Testing Library для Playwright
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/render-result-naming-convention': 'off',
        'testing-library/await-async-queries': 'off',
        'testing-library/no-await-sync-queries': 'off',
        'testing-library/no-debugging-utils': 'off',
        'testing-library/no-node-access': 'off',
      },
    },
  ],
};