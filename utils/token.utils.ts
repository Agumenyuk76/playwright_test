import { Page } from '@playwright/test';

export async function getAccessToken(page: Page): Promise<string> {
  await page.waitForLoadState('networkidle');

  await page.waitForFunction(
    () => {
      return localStorage.getItem('ttoken') !== null;
    },
    null,
    { timeout: 5000 },
  );
  const uiAccessToken = await page.evaluate(() => {
    return localStorage.getItem('ttoken') || '';
  });
  console.log('UI ACCESS TOKEN:', uiAccessToken);
  return uiAccessToken.replace('Bearer ', '');
}
