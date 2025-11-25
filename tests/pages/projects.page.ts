import { Page, Locator } from '@playwright/test';

export class ProjectsPage {
  constructor(private page: Page) {}

  readonly menuProjects = this.page.getByRole('menu').getByText('Проекты');

  async goToProjects() {
    await this.menuProjects.click();
  }

  async getProjectLink(name: string) {
    return this.page.getByRole('link', { name });
  }

  async getProjectInTable(name: string) {
    return this.page.locator('tbody').getByRole('link', { name });
  }
}
