const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation (Framebusting)', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('game.html should reveal body when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);

    // Wait for the framebusting logic to execute and evaluate to display: block
    await page.waitForFunction(() => {
      const bodyDisplay = window.getComputedStyle(document.body).display;
      return bodyDisplay === 'block';
    });

    const display = await page.evaluate(() => {
      return window.getComputedStyle(document.body).display;
    });

    expect(display).toBe('block');
  });

  test('index.html should reveal body when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);

    // Wait for the framebusting logic to execute and evaluate to display: block
    await page.waitForFunction(() => {
      const bodyDisplay = window.getComputedStyle(document.body).display;
      return bodyDisplay === 'block';
    });

    const display = await page.evaluate(() => {
      return window.getComputedStyle(document.body).display;
    });

    expect(display).toBe('block');
  });
});
