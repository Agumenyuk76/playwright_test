import { test, expect } from '@playwright/test';

// тут вынесена функция на проверку кнопки Да/Нет Альфа релиза в проекте
async function ensureAlphaIsEnabled(page: Page) {
  const alphaLabel = page.getByLabel('Alpha релизы');
  const alphaText = (await alphaLabel.innerText()).trim();

  if (!alphaText.includes('Да')) {
    await page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    await expect(page.getByLabel('Alpha релизы')).toContainText('Да');
  }
}

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

  //Вкл/Выкл Альфа признака
  test('Вклюение Альфа признака в проекте', async ({ page }) => {
  await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt');
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('uer7');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByText('SSberbank Technology').click();
  await page.getByRole('menu').getByText('Продукты').click();
  await page.getByRole('cell', { name: 'Platform V Test Tools' }).click();

  await ensureAlphaIsEnabled(page);

  //Создание Альфы
  test('Создание Альфы с использованием access_token', async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/openapi/v1/productVersions/alfa`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-dspc-tenant': 'SBT-TNT',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      data: {
        productVersionId: 'TST.41',
        distribUrl:
          'https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main',
        referenceInstallationName: 'наименование тестовое',
        description: 'описание альфы тест описания',
      },
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    expect(createBody).toHaveProperty('productVersionAlfaId');
    expect(createBody).toHaveProperty('status');

    expect(typeof createBody.productVersionAlfaId).toBe('string');
    expect(createBody.productVersionAlfaId.length).toBeGreaterThan(0);
    expect(createBody.status).toBe(true);
  });
});

//удаление альфы
test('Удаление Альфа релиза', async ({ page }) => {
await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');
await page.getByRole('textbox', { name: 'Username or email' }).click();
await page.getByRole('textbox', { name: 'Username or email' }).press('CapsLock');
await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('user7');
await page.getByRole('button', { name: 'Sign In' }).click();
await page.getByText('SSberbank Technology').click();
await page.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();
await expect(page.getByRole('cell', { name: 'Тест 2.16.2-alpha7' })).toBeVisible();
await expect(page.locator('tbody')).toContainText('Тест 2.16.2-alpha7');
await page.getByRole('cell', { name: 'ellipsis' }).first().click();

// Проверка созданного альфа релиза 


await page1.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();

await expect(page1.getByRole('cell', { name: 'Тест 2.16.2-alpha7' })).toBeVisible();
await expect(page1.locator('tbody')).toContainText('Тест 2.16.2-alpha7');

await page1.getByRole('cell', { name: 'Тест 2.16.2-alpha7' }).click();

await expect(page1.locator('span').filter({ hasText: 'Выпущен' }).first()).toBeVisible();
await page1.getByText('Platform V Test Tools', { exact: true }).click();
await expect(page1.locator('div').filter({ hasText: /^Номер версии$/ }).first()).toBeVisible();


await expect(page1.locator('div').filter({ hasText: /^Platform V Test Tools$/ }).nth(4)).toBeVisible();
await page1.locator('.root-0-2-179').first().click();
await expect(page1.getByText('Руководитель проектного офиса')).toBeVisible();
await page1.getByText('Project office').click();
await page1.getByText('Тестовый Пользователь №3').click();
await page1.getByText('Тестовый Пользователь №4').click();
//добавить проверку на наличие комментария 
//getByRole('textbox',{name: '*Описание upload question-'})

});