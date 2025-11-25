// ходила на https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main
// у саши ходит на https://da-dp02-ws-prjm-vp-1.apps.dap.devpub-02.solution.sbt/

import { test, expect } from '@playwright/test';

test('Проверка отображения месяцев, кварталов и тултипов', async ({ page }) => {
  // --- Авторизация ---
  await page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');

  await expect(page.getByRole('textbox', { name: 'Username or email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username or email' }).fill('user7');
  await page.getByRole('textbox', { name: 'Password' }).fill('user7');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // --- Выбор организации ---
  await expect(page.getByText('SSberbank Technology')).toBeVisible();
  await page.getByText('SSberbank Technology').click();

  // --- Переход в Ресурсные планы ---
  await page.getByRole('menu').getByText('Ресурсные планы').click();

  // --- Выбор департамента ---

  await page.getByRole('combobox').filter({ hasText: 'Project office' }).click();
  await page.getByRole('option', { name: 'Operational Department' }).click();

  // --- Выбор трайба ---
  await page.getByRole('combobox').filter({ hasText: 'Выберите трайб' }).click();
  await page.getByRole('option', { name: 'Business Application' }).click();

  // --- Выбор продукта ---
  await page.getByRole('combobox').filter({ hasText: 'Выберите продукт' }).click();
  await page.getByRole('option', { name: 'Platform V DataSpace' }).click();

  // --- Выбор плана ---
  await page.getByRole('combobox').filter({ hasText: 'Выберите план' }).click();
  await page.getByRole('option', { name: '-1 копия Черновик' }).click();

  // --- Проверка месяцев ---
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  for (const month of months) {
    await expect(page.getByRole('button', { name: month })).toBeVisible();
  }

  // --- Hover на Jan и проверка тултипа ---
  const janButton = page.getByRole('button', { name: 'Jan' });

  await janButton.hover();

  await expect(page.getByRole('tooltip', { name: /Общий процент загрузки: 104%/i })).toBeVisible();

  // --- Кнопка смены отображения ---
  const viewSwitchBtn = page.locator('.overlayContent-0-2-10 > div > .anticon');
  await expect(viewSwitchBtn).toBeVisible();

  await viewSwitchBtn.hover();

  await expect(
    page.getByRole('tooltip', { name: /Изменить отображение статистики на квартальный/i }),
  ).toBeVisible();

  await viewSwitchBtn.click();

  // --- Проверка кварталов ---
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  for (const quarter of quarters) {
    await expect(page.getByRole('button', { name: quarter })).toBeVisible();
  }

  // --- Hover на Q1 и проверка тултипа ---
  const q1Button = page.getByRole('button', { name: 'Q1' });

  await q1Button.hover();

  await expect(page.getByRole('tooltip', { name: /Общий процент загрузки: 104%/i })).toBeVisible();
});
