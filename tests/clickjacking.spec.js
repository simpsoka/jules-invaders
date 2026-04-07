const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('Page should evaluate to display: block when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);

    // Verify body display becomes block when loaded directly (not in iframe)
    const body = page.locator('body');
    await expect(body).toHaveCSS('display', 'block');
  });
});
