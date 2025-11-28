import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login_alfa.page';
import { AlphaPage } from '../pages/alfa.page';
import { BASE_URL, USERNAME, PASSWORD, TENANT, PRODUCT_VERSION_ID } from '../utils/constants';

let apiAccessToken: string;
let uiAccessToken: string;
let productVersionAlfaId: string;

async function ensureAlphaIsEnabled(page: Page) {
  const alphaLabel = page.getByLabel('Alpha релизы');
  const alphaText = (await alphaLabel.innerText()).trim();

  if (!alphaText.includes('Да')) {
    await page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    await expect(page.getByLabel('Alpha релизы')).toContainText('Да');
  }
}

test.describe('Авторизация ', () => {
  //  Авторизация API
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/public/v1/auth`, {
      headers: { Accept: '*/*', 'Content-Type': 'application/json', 'x-dspc-tenant': TENANT },
      data: { username: USERNAME, password: PASSWORD },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    apiAccessToken = body.access_token;
  });

  // Включение альфа признака через UI
  test('Включение Альфа признака', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const alphaPage = new AlphaPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    uiAccessToken = await loginPage.getToken();

    await page.getByText('SSberbank Technology').click();
    await page.getByRole('menu').getByText('Продукты').click();
    await page.getByRole('cell', { name: 'Platform V Test Tools' }).click();

    await ensureAlphaIsEnabled(page);

    await alphaPage.ensureAlphaEnabled();
  });

  // Создание альфы через API
  test.describe('Создание Альфа релиза', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/backend/openapi/v1/productVersions/alfa`, {
      headers: {
        Authorization: `Bearer ${apiAccessToken}`,
        'x-dspc-tenant': TENANT,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      data: {
        productVersionId: PRODUCT_VERSION_ID,
        distribUrl: `${BASE_URL}/erp/main`,
        referenceInstallationName: 'наименование тестовое',
        description: 'описание альфы тест описания',
      },
    });

    expect(response.status()).toBe(200);

    const createBody = await response.json();

    expect(createBody).toHaveProperty('productVersionAlfaId');
    expect(createBody).toHaveProperty('status');

    expect(typeof createBody.productVersionAlfaId).toBe('string');
    expect(createBody.productVersionAlfaId.length).toBeGreaterThan(0);
    expect(createBody.status).toBe(false);
    productVersionAlfaId = createBody.productVersionAlfaId;
    console.log(`Создана альфа. productVersionAlfaId = ${productVersionAlfaId}`);
  });

  // Проверка созданного альфа релиза через UI
  test('Проверка созданной Альфы в UI', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const alphaPage = new AlphaPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);

    await page.getByText('SSberbank Technology').click();
    await page.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();

    await page.locator('.anticon.anticon-setting > svg').click();
    await page.getByText('ID').click();
    await page.getByRole('button', { name: 'search' }).first().click();
    await page.getByRole('textbox', { name: 'Поиск ID' }).click();
    await page.getByRole('textbox', { name: 'Поиск ID' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Поиск ID' }).fill(productVersionAlfaId);
    await page.getByRole('button', { name: 'Поиск search' }).click();
    await expect(page.locator('tbody')).toContainText(productVersionAlfaId);

    await page.getByRole('link', { name: '-alpha11' }).click();
  });

  // Отключение альфа признака
  test('Отключение Альфа признака', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const alphaPage = new AlphaPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);

    await alphaPage.ensureAlphaDisabled();
    // Здесь можно добавить проверку API на 400/405, если вызывается при выключенном признаке
  });

  // Удаление альфа релиза через UI
  //test('Удаление Альфа релиза', async ({ page }) => {
  //const loginPage = new LoginPage(page);
  //const alphaPage = new AlphaPage(page);

  //await page.goto(BASE_URL);
  //await loginPage.login(USERNAME, PASSWORD);

  //await alphaPage.searchById(productVersionAlfaId);

  //await page.getByRole('cell', { name: 'ellipsis' }).first().click();
  //await page.getByText('Удалить').click();
  //});
});
