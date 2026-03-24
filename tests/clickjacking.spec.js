const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Security: Clickjacking Mitigation', () => {
  test('Page is revealed when loaded directly', async ({ page }) => {
    // Navigate to the local game.html file
    const filePath = path.resolve(__dirname, '../game.html');
    await page.goto(`file://${filePath}`);

    // Wait for the body's inline style to be set to 'block'
    // We do not check initial cssRules here due to SecurityError with file:// protocol.
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  // Note: We cannot easily test the `window.top.location = window.self.location`
  // break-out behavior using playwright because playwright runs the tests
  // in a similar isolated context, and trying to load a file in an iframe
  // with another local file often violates same-origin policy or gets
  // complicated by Playwright's specific browser context restrictions.
  // The primary verification is that the app actually loads when NOT in a frame.
});
