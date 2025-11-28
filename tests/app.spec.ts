import { test, expect } from '@playwright/test';

test('layout shows AOI panel and map', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Figma title
  await expect(page.getByText('Define Area of Interest')).toBeVisible();

  // Search input
  await expect(
    page.getByPlaceholder('Search for a city, town... or draw area on map')
  ).toBeVisible();

  // Upload button
  await expect(page.getByText('Uploading a shape file')).toBeVisible();

  // Map container
  await expect(page.getByTestId('map-container')).toBeVisible();
});

test('WMS visibility toggle updates chip text', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Default state
  await expect(page.getByText('Visible')).toBeVisible();

  // Button label contains "satellite layer"
  const toggleButton = page.getByRole('button', { name: /satellite layer/i });

  // Hide
  await toggleButton.click();
  await expect(page.getByText('Hidden')).toBeVisible();

  // Show again
  await toggleButton.click();
  await expect(page.getByText('Visible')).toBeVisible();
});
