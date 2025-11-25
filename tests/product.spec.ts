import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');
  await expect(page.getByRole('textbox', { name: 'Username or email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(
    page.getByText(
      'Добро пожаловать в SberProjectДоступные организации:SSergeyOrg1TTest1SSberbank',
    ),
  ).toBeVisible();
  await expect(page.getByText('SSberbank Technology')).toBeVisible();
  await page.getByText('SSberbank Technology').click();
  await expect(
    page.getByText(
      'Главная страницаПроектыПродуктыВерсии продуктовРесурсные планыМои планыТрудозатр',
    ),
  ).toBeVisible();
  await expect(page.getByRole('menu').getByText('Проекты')).toBeVisible();
  await page.getByRole('menu').getByText('Проекты').click();
  await expect(page.getByRole('link', { name: 'Testing' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Test project 7651_ZAPP_09_15_17_05_47' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Platform V Test' })).toBeVisible();
  await expect(page.getByRole('link', { name: '13_years_plan_ZAPP_09_15_14_54_11' })).toBeVisible();
  await expect(
    page.locator('tbody').getByRole('link', { name: 'Test 999_ZAPP_09_15_14_49_09' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'ZAPP_11_24_13_18_09' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ZAPP_11_24_13_05_32' })).toBeVisible();
  await expect(page.getByRole('link', { name: '2111-' })).toBeVisible();
  await expect(page.getByRole('link', { name: '-2' })).toBeVisible();
  await expect(page.getByRole('link', { name: '2011-1' })).toBeVisible();
});
