const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  test('page reveals body when not framed', async ({ page }) => {
    const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
    await page.goto(indexUrl);

    const body = page.locator('body');
    await expect(body).toHaveCSS('display', 'block');
  });
});
