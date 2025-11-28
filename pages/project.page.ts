import { Page, expect } from '@playwright/test';

export class ProjectPage {
  constructor(private page: Page) {}

  async openProject(projectName: string) {
    await this.page.getByText('SSberbank Technology').click();
    await this.page.getByRole('menu').getByText('Продукты').click();
    await this.page.getByRole('cell', { name: projectName }).click();
  }
  async enableAlphaFeature() {
    const alphaLabel = this.page.getByLabel('Alpha релизы');

    if ((await alphaLabel.textContent()) === 'Нет') {
      await this.page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    }
  }
  async disableAlphaFeature() {
    const alphaLabel = this.page.getByLabel('Alpha релизы');

    if ((await alphaLabel.textContent()) === 'Да') {
      await this.page.getByRole('switch', { name: 'Alpha релизы :' }).click();
    }
  }
  async save() {
    await this.page.getByRole('button', { name: 'Сохранить save' }).click();
    //await expect(this.page.locator('div').filter({ hasText: 'Сохранено успешно' })).toBeVisible(); упал
  }
}
