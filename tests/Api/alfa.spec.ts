import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path = require('path');

// тут вынесена функция на проверку кнопки Да/Нет Альфа релиза в проекте -да
async function ensureAlphaIsEnabled(page: Page) {
  const alphaLabel = page.getByLabel('Alpha релизы');
  const alphaText = (await alphaLabel.innerText()).trim();

  if (!alphaText.includes('Да')) {
    await page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    await expect(page.getByLabel('Alpha релизы')).toContainText('Да');
  }
}

// тут вынесена функция на проверку кнопки Да/Нет Альфа релиза в проекте -нет
async function ensureAlphaIsNOEnabled(page: Page) {
  const alphaLabel = page.getByLabel('Alpha релизы');
  const alphaText = (await alphaLabel.innerText()).trim();

  if (!alphaText.includes('Нет')) {
    await page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    await expect(page.getByLabel('Alpha релизы')).toContainText('Нет');
  }
}

// ui токен
let uiAccessToken: string;

// id альфы
let productVersionAlfaId: string;

test.describe('Авторизация + Создание Альфы', () => {
  let accessToken: string;

  const BASE_URL = 'https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt';
  const USERNAME = 'user7';
  const PASSWORD = 'user7';

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/public/v1/auth`, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'x-dspc-tenant': 'SBT-TNT',
      },
      data: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('access_token');

    accessToken = body.access_token;

    console.log('Access token получен:', accessToken);
  });

  test('Авторизация: получаем access_token', async () => {
    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(0);
  });

  //Вкл/Выкл Альфа признака -работает, но признак всегда выкл?
  test('Вклюение Альфа признака в проекте', async ({ page }) => {
    await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt');
    await page.getByRole('textbox', { name: 'Username or email' }).click();
    await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('user7');
    await page.getByRole('button', { name: 'Sign In' }).click();

    //получаем токен
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(
      () => {
        return localStorage.getItem('ttoken') !== null;
      },
      null,
      { timeout: 5000 },
    );

    // достаём токен
    const uiAccessToken = await page.evaluate(() => {
      return localStorage.getItem('ttoken') || '';
    });

    console.log('UI ACCESS TOKEN:', uiAccessToken);

    await page.getByText('SSberbank Technology').click();
    await page.getByRole('menu').getByText('Продукты').click();
    await page.getByRole('cell', { name: 'Platform V Test Tools' }).click();

    await ensureAlphaIsEnabled(page); // добавить шаг на сохранениеawait

    await page.getByRole('button', { name: 'Сохранить save' }).click();
    await page.locator('div').filter({ hasText: 'Сохранено успешно' }).nth(3).click();
  });

  //Создание Альфы- работает
  test('Создание Альфы с использованием access_token', async ({ request }) => {
    const createResponse = await request.post(
      `${BASE_URL}/backend/openapi/v1/productVersions/alfa`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-dspc-tenant': 'SBT-TNT',
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        data: {
          productVersionId: 'TST.41',
          distribUrl: 'https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main',
          referenceInstallationName: 'наименование тестовое',
          description: 'описание альфы тест описания',
        },
      },
    );

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    expect(createBody).toHaveProperty('productVersionAlfaId');
    expect(createBody).toHaveProperty('status');

    expect(typeof createBody.productVersionAlfaId).toBe('string');
    expect(createBody.productVersionAlfaId.length).toBeGreaterThan(0);
    expect(createBody.status).toBe(false);
    productVersionAlfaId = createBody.productVersionAlfaId;

    fs.writeFileSync('tmp/productVersionAlfaId.json', JSON.stringify({ productVersionAlfaId }));

    console.log(`Создана альфа. productVersionAlfaId = ${productVersionAlfaId}`);
    const tmpDir = path.resolve('tmp');

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(tmpDir, 'productVersionAlfaId.json'),
      JSON.stringify({ productVersionAlfaId }),
    );
  });
});

// Проверка созданного альфа релиза -добавить проверку онкретного релиза-вытянуть результат из создания

test('Проверка созданного альфа релиза', async ({ page }) => {
  const file = fs.readFileSync('tmp/productVersionAlfaId.json', 'utf-8');
  const { productVersionAlfaId } = JSON.parse(file);

  await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('SSberbank Technology').click();
  await page.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();
  //ищем то что создали

  //
  await page.locator('.anticon.anticon-setting > svg').click();
  await page.getByText('ID').click();
  await page.getByRole('button', { name: 'search' }).first().click();
  await page.getByRole('textbox', { name: 'Поиск ID' }).click();
  await page.getByRole('textbox', { name: 'Поиск ID' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Поиск ID' }).fill(productVersionAlfaId);
  await page.getByRole('button', { name: 'Поиск search' }).click();
  await expect(page.locator('tbody')).toContainText(productVersionAlfaId);

  await page.getByRole('cell', { name: 'TST.61' }).dblclick(); //вставить динамич переменн

  await expect(page.locator('span').filter({ hasText: 'Выпущен' }).first()).toBeVisible();
  await page.getByText('Platform V Test Tools', { exact: true }).click();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Номер версии$/ })
      .first(),
  ).toBeVisible();

  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Platform V Test Tools$/ })
      .nth(4),
  ).toBeVisible();

  await expect(page.getByText('Руководитель проектного офиса')).toBeVisible();
  await page.getByText('Project office').click();
  await page.getByText('Тестовый Пользователь №3').click();
  //await page.getByText('Тестовый Пользователь №4').click();-он не создался
});

//удаление альфы
test('Удаление Альфа релиза', async ({ page }) => {
  const file = fs.readFileSync('tmp/productVersionAlfaId.json', 'utf-8');
  const { productVersionAlfaId } = JSON.parse(file);
  await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('SSberbank Technology').click();
  await page.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();

  //эксперимент -удаляем то, что создали
  await page.locator('.anticon.anticon-setting > svg').click();
  await page.getByText('ID').click();
  await page.getByRole('button', { name: 'search' }).first().click();
  await page.getByRole('textbox', { name: 'Поиск ID' }).click();
  await page.getByRole('textbox', { name: 'Поиск ID' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Поиск ID' }).fill(productVersionAlfaId);
  await page.getByRole('button', { name: 'Поиск search' }).click();

  await page.getByRole('cell', { name: 'ellipsis' }).first().click();
  // проверяем что поик ничего не выводит
  await page.getByRole('textbox', { name: 'Поиск ID' }).click();
  await page.getByRole('textbox', { name: 'Поиск ID' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Поиск ID' }).fill(productVersionAlfaId);
  await page.getByRole('button', { name: 'Поиск search' }).click();
});
