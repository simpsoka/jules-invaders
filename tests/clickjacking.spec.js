const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('Page should evaluate to display: block when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);

    await page.waitForFunction(() => {
      const body = document.querySelector('body');
      return body && window.getComputedStyle(body).display === 'block';
    });

    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });
});
