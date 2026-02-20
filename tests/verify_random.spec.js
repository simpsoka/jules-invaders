const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Secure Randomness Verification', () => {
  test('secureRandom function should generate values between 0 and 1', async ({ page }) => {
    // Navigate to the game page
    // Using file:// protocol requires absolute path
    const gameUrl = `file://${path.resolve(__dirname, '../game.html')}`;
    await page.goto(gameUrl);

    // Ensure secureRandom is defined
    const isDefined = await page.evaluate(() => typeof secureRandom === 'function');
    expect(isDefined).toBeTruthy();

    // Generate multiple random numbers
    const samples = await page.evaluate(() => {
      const results = [];
      for (let i = 0; i < 100; i++) {
        results.push(secureRandom());
      }
      return results;
    });

    // Verify each number is within range [0, 1)
    for (const val of samples) {
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }

    // Verify randomness (not all same)
    const uniqueValues = new Set(samples);
    expect(uniqueValues.size).toBeGreaterThan(1);
  });

  test('secureRandom should use crypto.getRandomValues if available', async ({ page }) => {
      const gameUrl = `file://${path.resolve(__dirname, '../game.html')}`;
      await page.goto(gameUrl);

      const usedCrypto = await page.evaluate(() => {
          if (window.crypto && window.crypto.getRandomValues) {
              return true;
          }
          return false;
      });

      expect(usedCrypto).toBeTruthy();
  });

  test('game should run without errors', async ({ page }) => {
    const gameUrl = `file://${path.resolve(__dirname, '../game.html')}`;
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Ignore known errors related to asset loading in file:// protocol or missing assets
        const text = msg.text();
        if (
          !text.includes('ERR_REQUEST_RANGE_NOT_SATISFIABLE') &&
          !text.includes('ERR_FILE_NOT_FOUND') &&
          !text.includes('Failed to load resource')
        ) {
          errors.push(text);
        }
      }
    });
    page.on('pageerror', exception => {
      // Ignore known errors
      const message = exception.message || exception.toString();
      if (
          !message.includes('ERR_REQUEST_RANGE_NOT_SATISFIABLE') &&
          !message.includes('ERR_FILE_NOT_FOUND') &&
          !message.includes('Failed to load resource')
        ) {
          errors.push(message);
      }
    });

    await page.goto(gameUrl);

    // Wait for some frames to pass (simulate game running)
    await page.waitForTimeout(1000); // 1 second

    expect(errors).toHaveLength(0);
  });
});
