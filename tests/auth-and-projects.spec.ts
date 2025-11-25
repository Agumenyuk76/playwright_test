import { test } from '@playwright/test';

import { LoginPage } from '@pages/login.page';
import { OrganizationPage } from '@pages/organization.page';
import { ProjectsPage } from '@pages/projects.page';

import { LoginSteps } from '@steps/login.steps';
import { OrganizationSteps } from '@steps/organization.steps';
import { ProjectsSteps } from '@steps/projects.steps';

test('Авторизация и проверка списка проектов', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const orgPage = new OrganizationPage(page);
  const projectsPage = new ProjectsPage(page);
  const loginSteps = new LoginSteps(loginPage);
  const orgSteps = new OrganizationSteps(orgPage);
  const projectsSteps = new ProjectsSteps(projectsPage);

  await loginPage.open();

  await loginSteps.checkLoginForm();
  await loginSteps.login('user7', 'user7');

  await orgSteps.checkWelcome();
  await orgSteps.chooseOrganization();

  await projectsSteps.goToProjects();
  await projectsSteps.checkProjectsList();
});
