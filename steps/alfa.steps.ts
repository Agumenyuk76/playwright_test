import { Page, APIRequestContext, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { ProjectPage } from '../pages/project.page';
import { VersionsPage } from '../pages/versions.page';

import { createAlfa } from '../utils/apiClient';
import { getAccessToken } from '../utils/token.utils';

export class AlfaSteps {
  private loginPage: LoginPage;
  private projectPage: ProjectPage;
  private versionsPage: VersionsPage;

  constructor(private page: Page, private request: APIRequestContext) {
    this.loginPage = new LoginPage(page);
    this.projectPage = new ProjectPage(page);
    this.versionsPage = new VersionsPage(page);
  }

  async enableAlphaInProject() {
    await this.loginPage.open();
    await this.loginPage.login('user7', 'user7');

    await this.projectPage.openProject('Platform V Test Tools');
    await this.projectPage.enableAlphaFeature();
    await this.projectPage.save();
  }
  async disableAlphaInProject() {
    await this.loginPage.open();
    await this.loginPage.login('user7', 'user7');

    await this.projectPage.openProject('Platform V Test Tools');
    await this.projectPage.disableAlphaFeature();
    await this.projectPage.save();
  }

  async createAlfaViaApi(): Promise<string> {
    const token = await getAccessToken(this.page);

    const result = await createAlfa(this.request, token);

    expect(result.status).toBe(200);
    expect(result.body.productVersionAlfaId).not.toBe('');

    return result.body.productVersionAlfaId;
  }
  async uncreateAlfaViaApi(): Promise<string> {
    const token = await getAccessToken(this.page);

    const result = await createAlfa(this.request, token);

    expect(result.status).toBe(400);
    expect(result.body.message).toBe('ProductVersionAlfa mode not enabled in productId = TST');

    return result.body.message;
  }

  async verifyAlfaInUI(alfaId: string) {
    await this.versionsPage.open();
    await this.versionsPage.searchById(alfaId);
    await this.versionsPage.verifyAlfaFound(alfaId);
    await this.versionsPage.openAlfaCard(alfaId);
  }

  async deleteAlfaInUI(alfaId: string) {
    await this.versionsPage.open();
    await this.versionsPage.searchById(alfaId);
    await this.versionsPage.deleteAlfa();
    await this.versionsPage.searchById(alfaId);
    await this.versionsPage.verifyAlfaDeleted(alfaId);
  }
}
