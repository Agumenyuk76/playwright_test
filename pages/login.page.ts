import { Page } from '@playwright/test';
import { ERP_URL } from '../config/endpoints';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(ERP_URL);
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username or email' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();

    await this.page.waitForLoadState('networkidle');
  }
}
