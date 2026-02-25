const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Performance and Rendering Stability', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('game.html should run without errors for 2 seconds', async ({ page }) => {
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

    // Wait for game loop
    await page.waitForTimeout(2000);

    // Verify canvas exists
    const canvas = page.locator('#gameCanvas');
    await expect(canvas).toBeVisible();

    // Verify no unexpected console errors
    expect(consoleErrors).toEqual([]);
  });
});
