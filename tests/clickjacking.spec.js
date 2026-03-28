const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('body should be visible when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);
    // Wait for the page to evaluate to display: block when loaded directly
    await page.waitForFunction(() => window.getComputedStyle(document.body).display === 'block');
    // Check if the body style was updated to 'block'
    const displayStyle = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(displayStyle).toBe('block');
  });
});
