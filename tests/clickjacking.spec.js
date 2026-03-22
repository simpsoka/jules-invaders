const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('Page should display: none initially and change to block if not framed', async ({ page }) => {
    await page.goto(indexUrl);

    // Check if the script evaluated to display: block
    const displayStyle = await page.evaluate(() => document.body.style.display);
    expect(displayStyle).toBe('block');

  });
});
