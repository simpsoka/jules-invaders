const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Security Enhancements', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('secureRandom should be defined and return valid values', async ({ page }) => {
    await page.goto(gameUrl);

    // Verify secureRandom function exists and works
    const result = await page.evaluate(() => {
      if (typeof window.secureRandom !== 'function') {
        return { error: 'secureRandom is not a function' };
      }
      const val = window.secureRandom();
      return {
        isNumber: typeof val === 'number',
        inRange: val >= 0 && val < 1,
        value: val
      };
    });

    expect(result.error).toBeUndefined();
    expect(result.isNumber).toBe(true);
    expect(result.inRange).toBe(true);
  });

  test('game loop should run without errors using secureRandom', async ({ page }) => {
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

    // Allow game to run for a bit to ensure random calls happen
    await page.waitForTimeout(1000);

    expect(consoleErrors).toEqual([]);
  });
});
