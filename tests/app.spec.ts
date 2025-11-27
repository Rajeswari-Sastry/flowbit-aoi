import { test, expect } from '@playwright/test';

test('app loads with layout and map', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Topbar should be visible
  await expect(page.getByTestId('topbar-title')).toBeVisible();

  // Sidebar should be visible
  await expect(page.getByTestId('sidebar')).toBeVisible();

  // Map container should be visible
  await expect(page.getByTestId('map-container')).toBeVisible();
});

test('map basic smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const map = page.getByTestId('map-container');
  await expect(map).toBeVisible();

  // Simple wait to let tiles load (just a smoke test)
  await page.waitForTimeout(1000);
});
test('custom zoom controls are visible', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('button', { name: /zoom in/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /zoom out/i })).toBeVisible();
});
