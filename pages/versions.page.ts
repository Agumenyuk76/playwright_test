import { Page, expect } from '@playwright/test';

export class VersionsPage {
  constructor(private page: Page) {}

  async open() {
    // await this.page.getByText('SSberbank Technology').click();
    await this.page.getByRole('menuitem', { name: 'branches Версии продуктов' }).click();
  }

  async searchById(alfaId: string) {
    await this.page.locator('.anticon.anticon-setting > svg').click();
    await this.page.getByText('ID').click();
    await this.page.locator("//span[@data-cy='searchIcon-id']").click();
    const searchInput = this.page.locator("//input[@data-cy='stringInput-id']");

    await searchInput.fill(alfaId);
    await this.page.getByRole('button', { name: 'Поиск search' }).click();
  }

  async openAlfaCard(alfaId: string) {
    await this.page.getByRole('cell', { name: alfaId }).dblclick();
  }

  async verifyAlfaFound(alfaId: string) {
    await expect(this.page.locator('tbody')).toContainText(alfaId);
  }

  async deleteAlfa() {
    await this.page.getByRole('cell', { name: 'ellipsis' }).first().click();
    await this.page.getByText('Удалить').click();
  }

  async verifyAlfaDeleted(alfaId: string) {
    await expect(this.page.locator('tbody')).not.toContainText(alfaId);
  }
}
