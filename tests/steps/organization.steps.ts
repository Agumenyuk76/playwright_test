import { expect, test } from '@playwright/test';
import { OrganizationPage } from '@pages/organization.page';

export class OrganizationSteps {
  constructor(private orgPage: OrganizationPage) {}

  async checkWelcome() {
    await test.step('Проверка приветствия и списка организаций', async () => {
      await expect(this.orgPage.welcomeText).toBeVisible();
      await expect(this.orgPage.sberbankOrg).toBeVisible();
    });
  }

  async chooseOrganization() {
    await test.step('Выбор организации', async () => {
      await this.orgPage.selectOrganization();
    });
  }
}
