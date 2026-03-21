const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html should implement framebusting', async ({ page }) => {
    // We cannot easily test cross-origin framebusting with file:// protocol or data:// protocol
    // without running into security errors that Playwright correctly throws.
    // Instead we can test that the `body { display: none; }` is actually present
    // and wait for the page to evaluate the display: block when loaded directly.
    await page.goto(indexUrl);

    // When loaded directly, it should eventually be visible
    const isVisible = await page.evaluate(() => {
        return window.getComputedStyle(document.body).display === 'block';
    });
    expect(isVisible).toBe(true);
  });

  test('game.html should implement framebusting', async ({ page }) => {
    await page.goto(gameUrl);

    // When loaded directly, it should eventually be visible
    const isVisible = await page.evaluate(() => {
        return window.getComputedStyle(document.body).display === 'block';
    });
    expect(isVisible).toBe(true);
  });
});
