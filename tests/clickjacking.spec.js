const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('body should be visible when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);
    // Wait for the DOMContentLoaded script to run and set display to block
    await page.waitForFunction(() => {
      const style = window.getComputedStyle(document.body);
      return style.display === 'block';
    });
    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });
});
