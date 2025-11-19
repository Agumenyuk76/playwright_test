import { test, expect } from '@playwright/test';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.help/');
  });

  test('Проверка отображения элементов навигации', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Документация' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByText('Node.jsNode.jsPythonJava.NET')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Сообщество' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Обучение', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect(
      page.getByRole('button', {
        name: 'Переключение между темным и светлым режимом (сейчас используется Тёмный режим)',
      }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Поиск (Command+K)' })).toBeVisible();
  });
  test('Проверка названия элементов навигации', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect(page.getByRole('link', { name: 'Документация' })).toContainText('Документация');
    await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect(page.getByText('Node.jsNode.jsPythonJava.NET')).toContainText('Node.js');
    await expect(page.getByRole('link', { name: 'Сообщество' })).toContainText('Сообщество');
    await expect(page.getByRole('link', { name: 'Обучение', exact: true })).toContainText(
      'Обучение',
    );
  });
  test.fixme('Проверка атрибутов href элементов навигации ', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(page.getByRole('link', { name: 'Документация' })).toHaveAttribute(
      'href',
      '/docs/intro',
    );
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      'docs/api/class-playwright',
    );
    await expect(page.getByRole('link', { name: 'Сообщество' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
  });
});
