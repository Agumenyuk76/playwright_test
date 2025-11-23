import { Page } from '@playwright/test';
import { loginDaDp02 } from '../steps/Login.steps';

export async function fullDaDp02LoginFlow(
  page: Page,
  login: string,
  password: string,
) {
  const loginPage = await loginDaDp02(page, { login, password });

  // Пост-логин шаг
  await loginPage.companyButton.click();
}
