import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  readonly usernameInput: Locator = this.page.getByRole('textbox', { name: 'Username or email' });
  readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
  readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });

  async open() {
    await this.page.goto('https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main');
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }
}
