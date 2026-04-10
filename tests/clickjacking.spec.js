const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  test('page should set display: block when not framed', async ({ page }) => {
    const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();
    await page.goto(gameUrl);

    await page.waitForFunction(() => {
      const body = document.body;
      return window.getComputedStyle(body).display === 'block';
    });

    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });
});
