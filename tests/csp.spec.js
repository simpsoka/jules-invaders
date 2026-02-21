const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('CSP and Basic Loading', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html should have CSP and load without errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
         // Ignore expected audio failures in file:// protocol
         const text = msg.text();
         if (text.includes('ERR_FILE_NOT_FOUND') || text.includes('Failed to load resource')) return;
         consoleErrors.push(text);
      }
    });

    await page.goto(indexUrl);

    // Verify CSP meta tag
    const cspMeta = await page.$('meta[http-equiv="Content-Security-Policy"]');
    expect(cspMeta).not.toBeNull();
    const content = await cspMeta.getAttribute('content');
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self'");
    expect(content).not.toContain("'unsafe-inline'");

    // Verify Title to ensure page loaded
    await expect(page).toHaveTitle('Jules Invaders');

    // Verify no unexpected console errors
    expect(consoleErrors).toEqual([]);
  });

  test('game.html should have CSP and load without errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
         // Ignore expected audio failures in file:// protocol
         const text = msg.text();
         if (text.includes('ERR_FILE_NOT_FOUND') || text.includes('Failed to load resource')) return;
         consoleErrors.push(text);
      }
    });

    await page.goto(gameUrl);

    // Verify CSP meta tag
    const cspMeta = await page.$('meta[http-equiv="Content-Security-Policy"]');
    expect(cspMeta).not.toBeNull();
    const content = await cspMeta.getAttribute('content');
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self'");
    expect(content).not.toContain("'unsafe-inline'");

    // Verify Title
    await expect(page).toHaveTitle('Jules Invaders');

    // Verify no unexpected console errors
    expect(consoleErrors).toEqual([]);

    // Verify Play Again button is hidden initially (since we removed inline style)
    const playAgainBtn = page.locator('#playAgainBtn');
    await expect(playAgainBtn).toBeHidden();

    // Verify Mobile Controls are hidden initially
    const mobileControls = page.locator('#mobileControls');
    await expect(mobileControls).toBeHidden();
  });
});
