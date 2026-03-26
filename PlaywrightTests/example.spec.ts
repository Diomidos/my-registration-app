import { test, expect } from '@playwright/test';

test('Регистрация пользователя', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.registration-container', { timeout: 10000 });
  
  // Заполняем форму
  await page.getByLabel('Имя пользователя').fill('Diomid');
  await page.getByLabel('Пароль').fill('123456');
  await page.getByLabel('Подтверждение пароля').fill('123456');
  
  // Нажимаем кнопку
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  
  // Теперь ждем редирект на home
  await page.waitForURL(/.*home/, { timeout: 10000 });
  
  // Проверяем главную страницу
  await expect(page.locator('h1')).toContainText('Diomidos Life');
});
   


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

test('переключение между вкладками', async ({ page }) => {
  await page.goto('/home?mood=on');
  
  // Проверка, что по умолчанию открыта вкладка "Здоровье"
  await expect(page.locator('.health-section')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Трекер здоровья и баланса');
  
  // Проверка активного состояния кнопки "Здоровье" (если есть активный класс)
  await expect(page.getByRole('button', { name: 'Здоровье' })).toHaveClass(/active/);
  
  // Переключение на вкладку "Сообщество"
  await page.getByRole('button', { name: 'Сообщество' }).click();
  
  // Проверка, что отобразился заголовок вкладки сообщества
  await expect(page.locator('.community-section')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Сообщество');
  
  // Проверка активного состояния кнопки "Сообщество"
  await expect(page.getByRole('button', { name: 'Сообщество' })).toHaveClass(/active/);
  
  // Переключение на вкладку "Обучение"
  await page.getByRole('button', { name: 'Обучение' }).click();
  
  // Проверка, что отобразился заголовок вкладки обучения
  await expect(page.locator('.learning-section')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Центр обучения');
  
  // Проверка активного состояния кнопки "Обучение"
  await expect(page.getByRole('button', { name: 'Обучение' })).toHaveClass(/active/);
  
  // Переключение на вкладку "Эко-жизнь"
  await page.getByRole('button', { name: 'Эко-жизнь' }).click();
  
  // Проверка, что отобразился заголовок вкладки эко-жизни
  await expect(page.locator('.eco-section')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Калькулятор углеродного следа');
  
  // Проверка активного состояния кнопки "Эко-жизнь"
  await expect(page.getByRole('button', { name: 'Эко-жизнь' })).toHaveClass(/active/);
});