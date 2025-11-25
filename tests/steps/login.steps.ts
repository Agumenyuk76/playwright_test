import { expect, test } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

export class LoginSteps {
  constructor(private loginPage: LoginPage) {}

  async checkLoginForm() {
    await test.step('Проверка формы логина', async () => {
      await expect(this.loginPage.usernameInput).toBeVisible();
      await expect(this.loginPage.passwordInput).toBeVisible();
    });
  }

  async login(username: string, password: string) {
    await test.step(`Логин под пользователем ${username}`, async () => {
      await this.loginPage.fillCredentials(username, password);
      await this.loginPage.submit();
    });
  }
}
