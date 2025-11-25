import { expect, test } from '@playwright/test';
import { ProjectsPage } from '@pages/projects.page';

export class ProjectsSteps {
  constructor(private projectsPage: ProjectsPage) {}

  async goToProjects() {
    await test.step('Переход в меню Проекты', async () => {
      await this.projectsPage.goToProjects();
    });
  }

  async checkProjectsList() {
    await test.step('Проверка списка проектов', async () => {
      const projects = [
        'Testing',
        'Test project 7651_ZAPP_09_15_17_05_47',
        'Platform V Test',
        '13_years_plan_ZAPP_09_15_14_54_11',
        'ZAPP_11_24_13_18_09',
        'ZAPP_11_24_13_05_32',
        '2111-',
        '-2',
        '2011-1',
      ];

      for (const project of projects) {
        await expect(await this.projectsPage.getProjectLink(project)).toBeVisible();
      }

      await expect(
        await this.projectsPage.getProjectInTable('Test 999_ZAPP_09_15_14_49_09'),
      ).toBeVisible();
    });
  }
}
