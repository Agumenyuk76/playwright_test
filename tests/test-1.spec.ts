import { test, expect, Page } from '@playwright/test';
import { text } from 'stream/consumers';

const elements = [
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Документация' }),
    name: 'Документация',
    text: 'Документация',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Сообщество' }),
    name: 'Сообщество',
    text: 'Сообщество',
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Обучение', exact: true }),
    name: 'Обучение',
    text: 'Обучение',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.help/');
  });

  test('Проверка отображения элементов навигации', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названия элементов навигации ', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
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
  });
});
