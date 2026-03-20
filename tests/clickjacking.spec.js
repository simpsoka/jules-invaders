const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation (Framebusting)', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();

  test('index.html should framebust when loaded in an iframe', async ({ page }) => {
    // Navigate directly to the page to show it works when top-level
    await page.goto(indexUrl);
    // Because it's top level, the body visibility should eventually be 'visible'
    // after DOMContentLoaded executes our script.
    await expect(page.locator('body')).toHaveCSS('visibility', 'visible');

    // Create an iframe and listen to navigation on the top frame
    // Since `window.top.location = window.self.location` is executed,
    // the top frame should navigate to indexUrl when the iframe loads.

    // We expect the main frame to navigate back to indexUrl
    const navigationPromise = page.waitForNavigation({ url: indexUrl });

    await page.evaluate(`
      const iframe = document.createElement('iframe');
      iframe.src = '${indexUrl}';
      document.body.appendChild(iframe);
    `);

    // Wait for the navigation triggered by the framebuster
    await navigationPromise;
    expect(page.url()).toBe(indexUrl);
  });

  test('game.html should framebust when loaded in an iframe', async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page.locator('body')).toHaveCSS('visibility', 'visible');

    const navigationPromise = page.waitForNavigation({ url: gameUrl });

    await page.evaluate(`
      const iframe = document.createElement('iframe');
      iframe.src = '${gameUrl}';
      document.body.appendChild(iframe);
    `);

    await navigationPromise;
    expect(page.url()).toBe(gameUrl);
  });
});