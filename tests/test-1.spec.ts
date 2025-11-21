import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'stream/consumers';

//интерфейс типизирования элементов
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    // attribute: {
    //   type: 'href',
    //   value: '/',
    // }, пачиму то не видит '/' , видит ' '
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Документация' }),
    name: 'Документация',
    text: 'Документация',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Сообщество' }),
    name: 'Сообщество',
    text: 'Сообщество',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Обучение', exact: true }),
    name: 'Обучение',
    text: 'Обучение',
    attribute: {
      type: 'href',
      value: 'https://inzhenerka.tech/testing',
    },
  },
];

const lightMods: string[] = ['light', 'dark'];

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

  test('Проверка атрибутов href элементов навигации ', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка отрибутов href элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    });
  });

  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода `, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`'pageWith${value}Mode.png`);
    });
  });
});
