import { Page, expect } from '@playwright/test';

export class AlphaPage {
  constructor(private page: Page) {}

  alphaSwitch = this.page.getByRole('switch', { name: 'Alpha релизы :' });
  alphaLabel = this.page.getByLabel('Alpha релизы');
  searchInput = this.page.getByRole('textbox', { name: 'Поиск ID' });
  searchButton = this.page.getByRole('button', { name: 'Поиск search' });

  async ensureAlphaEnabled() {
    const text = (await this.alphaLabel.innerText()).trim();
    if (!text.includes('Да')) {
      await this.alphaSwitch.click();
      await expect(this.alphaLabel).toContainText('Да');
    }
  }

  async ensureAlphaDisabled() {
    const text = (await this.alphaLabel.innerText()).trim();
    if (!text.includes('Нет')) {
      await this.alphaSwitch.click();
      await expect(this.alphaLabel).toContainText('Нет');
    }
  }

  async searchById(id: string) {
    await this.searchInput.fill(id);
    await this.searchButton.click();
  }
}
