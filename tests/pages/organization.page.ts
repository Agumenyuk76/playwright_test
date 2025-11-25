import { Page, Locator } from '@playwright/test';

export class OrganizationPage {
  constructor(private page: Page) {}

  readonly welcomeText = this.page.getByText(
    'Добро пожаловать в SberProjectДоступные организации:',
  );

  readonly sberbankOrg = this.page.getByText('SSberbank Technology');

  async selectOrganization() {
    await this.sberbankOrg.click();
  }
}
