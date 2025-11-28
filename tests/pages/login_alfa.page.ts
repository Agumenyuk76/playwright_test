import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput = this.page.getByRole('textbox', { name: 'Username or email' });
  passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  signInButton = this.page.getByRole('button', { name: 'Sign In' });

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getToken(): Promise<string> {
    return await this.page.evaluate(() => localStorage.getItem('ttoken') || '');
  }
}
