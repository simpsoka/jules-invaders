const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Clickjacking Mitigation', () => {
  test('Page reveals body when loaded directly', async ({ page }) => {
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    // Wait for the page to evaluate to display: block when loaded directly
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('game.html reveals body when loaded directly', async ({ page }) => {
    const filePath = `file://${path.resolve(__dirname, '../game.html')}`;
    await page.goto(filePath);

    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});