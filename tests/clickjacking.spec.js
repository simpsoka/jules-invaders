const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Clickjacking Mitigation', () => {
  test('index.html reveals body when loaded directly', async ({ page }) => {
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    await page.waitForFunction(() => document.body.style.display === 'block');
    const display = await page.evaluate(() => document.body.style.display);
    expect(display).toBe('block');
  });

  test('game.html reveals body when loaded directly', async ({ page }) => {
    const filePath = `file://${path.resolve(__dirname, '../game.html')}`;
    await page.goto(filePath);

    await page.waitForFunction(() => document.body.style.display === 'block');
    const display = await page.evaluate(() => document.body.style.display);
    expect(display).toBe('block');
  });
});