import { API } from '../config/endpoints';
import { APIRequestContext } from '@playwright/test';

export async function createAlfa(request: APIRequestContext, token: string) {
  const response = await request.post(API.CREATE_ALFA, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-dspc-tenant': 'SBT-TNT',
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    data: {
      productVersionId: 'TST.41',
      distribUrl: 'https://da-dp02-ws-prjm-ift-1.apps.dap.devpub-02.solution.sbt/erp/main',
      referenceInstallationName: 'наименование тестовое',
      description: 'описание альфы тест описания',
    },
  });

  const body = await response.json();

  return {
    status: response.status(),
    body: body,
  };
}
