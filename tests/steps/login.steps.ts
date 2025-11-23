import { Page } from '@playwright/test';
import { VariablesStorage } from '../utils/variables.storage';
import { DaDp02LoginPage } from '../pages/Login.page';
import { openMainPage, waitForPageLoaded, waitSeconds, goRelative } from './common.steps';

interface LoginParams {
  login?: string;
  loginVar?: string;
  password?: string;
  passwordVar?: string;
}

export async function loginDaDp02(
  page: Page,
  params: LoginParams,
) {
  let login = params.login;
  let password = params.password;

  if (!login && params.loginVar) {
    login = VariablesStorage.get(params.loginVar);
  }

  if (!password && params.passwordVar) {
    password = VariablesStorage.get(params.passwordVar);
  }

  if (!login || !password) {
    throw new Error('Логин или пароль не переданы');
  }

  const loginPage = new DaDp02LoginPage(page);

  await openMainPage(page);
  await waitForPageLoaded(page);
  await waitSeconds(page, 1);

  await loginPage.waitForLoginInput();

  await loginPage.fillLogin(login);
  await loginPage.fillPassword(password);
  await loginPage.submit();

  await waitSeconds(page, 1);
  await goRelative(page, '/');

  return loginPage;
}
