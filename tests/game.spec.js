const { test, expect } = require('@playwright/test');
const path = require('path');

test('Game loads and canvas exists', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../game.html');
  await page.goto(`file://${filePath}`);

  // check for canvas
  const canvas = page.locator('#gameCanvas');
  await expect(canvas).toBeVisible();

  // Check if title is correct
  await expect(page).toHaveTitle(/Jules Invaders/);
});
