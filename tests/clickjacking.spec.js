const { test, expect } = require('@playwright/test');

test.describe('Clickjacking Mitigation', () => {
  test('game.html reveals body when loaded directly', async ({ page }) => {
    await page.goto(`file://${require('path').resolve(__dirname, '../game.html')}`);
    // Wait for the inline script framebusting to evaluate and update display
    await page.waitForFunction(() => document.body.style.display === 'block');
    const display = await page.evaluate(() => document.body.style.display);
    expect(display).toBe('block');
  });

  test('index.html reveals body when loaded directly', async ({ page }) => {
    await page.goto(`file://${require('path').resolve(__dirname, '../index.html')}`);
    await page.waitForFunction(() => document.body.style.display === 'block');
    const display = await page.evaluate(() => document.body.style.display);
    expect(display).toBe('block');
  });
});
