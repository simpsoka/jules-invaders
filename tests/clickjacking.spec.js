const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Clickjacking mitigation', () => {
  test('index.html body is visible when loaded directly', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../index.html')}`);
    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });

  test('game.html body is visible when loaded directly', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../game.html')}`);
    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });
});
