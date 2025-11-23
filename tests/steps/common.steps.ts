import { Page, expect } from '@playwright/test';

export async function openMainPage(page: Page) {
  await page.goto('/');
}

export async function waitForPageLoaded(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function waitSeconds(page: Page, seconds: number) {
  await page.waitForTimeout(seconds * 1000);
}

export async function goRelative(page: Page, path: string) {
  await page.goto(path);
}
