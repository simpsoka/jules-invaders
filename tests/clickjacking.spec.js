const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('body should be displayed when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);
    // When loaded directly, window.self === window.top is true.
    // Body should be set to display: block by the framebusting script.
    const bodyDisplay = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(bodyDisplay).toBe('block');
  });
});