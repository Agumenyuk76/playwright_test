import { Page, Locator } from '@playwright/test';

export class DaDp02LoginPage {
  constructor(private page: Page) {}

  get loginInput(): Locator {
    return this.page.locator('#login');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get submitButton(): Locator {
    return this.page.locator('#submit-login');
  }

  get companyButton(): Locator {
    return this.page.getByText('Sber');
  }

  async waitForLoginInput() {
    await this.loginInput.waitFor({ state: 'visible' });
  }

  async fillLogin(login: string) {
    await this.loginInput.fill(login);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }
}
