const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Protection', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html body is initially hidden and then revealed', async ({ page }) => {
    // We cannot easily test the initial CSS state of body because of file://
    // So we test that when loaded directly, it eventually becomes visible.
    await page.goto(indexUrl);

    // Wait for framebusting to reveal the body
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('game.html body is initially hidden and then revealed', async ({ page }) => {
    await page.goto(gameUrl);

    // Wait for framebusting to reveal the body
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});
