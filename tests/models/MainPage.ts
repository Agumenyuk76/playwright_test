import test, { expect, Locator, Page } from '@playwright/test';

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

export class MainPAge {
  readonly page: Page;
  readonly elemenst: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elemenst = [
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
  }
  async openMainPage() {
    await this.page.goto('https://playwright.help/');
  }
  async checkEltmtntsVisability() {
    this.elemenst.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    });
  }
}
