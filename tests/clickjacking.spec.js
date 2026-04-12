const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  test('index.html should be visible when loaded directly', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../index.html');
    const fileUrl = pathToFileURL(filePath).href;

    await page.goto(fileUrl);

    // Wait for the page to evaluate to display: block
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('game.html should be visible when loaded directly', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../game.html');
    const fileUrl = pathToFileURL(filePath).href;

    await page.goto(fileUrl);

    // Wait for the page to evaluate to display: block
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});
