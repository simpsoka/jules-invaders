const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation (Framebusting)', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html should be visible when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);

    // Wait for the body to have display: block applied via JS
    await page.waitForFunction(() => {
      const display = window.getComputedStyle(document.body).display;
      return display === 'block';
    });

    const body = page.locator('body');
    await expect(body).toHaveCSS('display', 'block');
  });

  test('game.html should be visible when loaded directly', async ({ page }) => {
    await page.goto(gameUrl);

    // Wait for the body to have display: block applied via JS
    await page.waitForFunction(() => {
      const display = window.getComputedStyle(document.body).display;
      return display === 'block';
    });

    const body = page.locator('body');
    await expect(body).toHaveCSS('display', 'block');
  });
});
