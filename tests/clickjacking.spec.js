const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('game.html should reveal body when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);
    // Wait for the DOMContentLoaded logic to execute
    await page.waitForFunction(() => document.body.style.display === 'block');
    const displayStyle = await page.evaluate(() => document.body.style.display);
    expect(displayStyle).toBe('block');
  });
});
