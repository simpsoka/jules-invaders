const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Prevention', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('body should be displayed when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);
    // When loaded normally, the anti-clickjacking script should reveal the body.
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });
});
