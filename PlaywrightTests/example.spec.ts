import { test, expect } from '@playwright/test';

test('должен отображать заголовок и навигацию', async ({ page }) => {
  // Переход на главную страницу
  await page.goto('/home?mood=on');
  
  // Проверка заголовка
  await expect(page.locator('h1')).toContainText('Diomidos Life');
  await expect(page.locator('.header-slogan')).toContainText('Твой путь к лучшей версии себя');
  
  // Проверка наличия кнопок навигации
  await expect(page.getByRole('button', { name: 'Здоровье' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Сообщество' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Обучение' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Эко-жизнь' })).toBeVisible();
});

test('переключение вкладок должно работать', async ({ page }) => {
  await page.goto('/home?mood=on');
  
  // Клик по вкладке "Сообщество"
  await page.getByRole('button', { name: 'Сообщество' }).click();
  
  // Проверка, что отобразился контент сообщества
  await expect(page.locator('.community-section')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Сообщество');
});