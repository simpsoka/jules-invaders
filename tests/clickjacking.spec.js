const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('body should be visible when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);
    await page.waitForFunction(() => window.getComputedStyle(document.body).display === 'block');
    await expect(page.locator('body')).toHaveCSS('display', 'block');

    await page.goto(gameUrl);
    await page.waitForFunction(() => window.getComputedStyle(document.body).display === 'block');
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});
