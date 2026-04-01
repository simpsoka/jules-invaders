const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html body should be block when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('game.html body should be block when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});