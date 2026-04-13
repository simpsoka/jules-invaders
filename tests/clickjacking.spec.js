const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('Page should display block when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);

    await page.waitForFunction(() => {
      return window.getComputedStyle(document.body).display === 'block';
    });

    const displayStyle = await page.evaluate(() => {
      return window.getComputedStyle(document.body).display;
    });

    expect(displayStyle).toBe('block');
  });
});
