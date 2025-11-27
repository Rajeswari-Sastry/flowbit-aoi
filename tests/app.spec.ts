import { test, expect } from '@playwright/test';

test('app loads with layout and map', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId('topbar-title')).toBeVisible();
  await expect(page.getByTestId('sidebar')).toBeVisible();
  await expect(page.getByTestId('map-container')).toBeVisible();
});

test('map basic smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const map = page.getByTestId('map-container');
  await expect(map).toBeVisible();

  // simple smoke wait for tiles to load
  await page.waitForTimeout(1000);
});

test('custom zoom controls are visible', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId('custom-zoom-in')).toBeVisible();
  await expect(page.getByTestId('custom-zoom-out')).toBeVisible();
  await expect(page.getByTestId('custom-reset-view')).toBeVisible();
});
