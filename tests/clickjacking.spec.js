const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).toString();

  test('Page should reveal body when loaded directly', async ({ page }) => {
    await page.goto(indexUrl);
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('Page should keep body hidden when framed cross-origin', async ({ page }) => {
    // We can't easily intercept file:// protocols to modify the response with Playwright route.fetch
    // Instead we will load an about:blank page, inject the DOM, and then inject the script.
    await page.goto('about:blank');

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="${pathToFileURL(path.resolve(__dirname, '../style.css')).toString()}">
      </head>
      <body data-gamemode="demo" style="display: none;">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="overlay">
          <h1 class="title">Jules Invaders</h1>
          <a href="game.html" class="play-button">Play</a>
        </div>
      </body>
      </html>
    `);

    // Read script.js content so we can inject and execute it manually, injecting fake window references
    const fs = require('fs');
    let scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

    // Replace window.self/top checks in the script with fake ones for testing
    scriptContent = scriptContent.replace('window.self === window.top', 'false');
    scriptContent = scriptContent.replace('document.referrer', '"https://malicious.com"');

    // Add modified script.js
    await page.addScriptTag({ content: scriptContent });

    // Manually trigger DOMContentLoaded to execute the logic
    await page.evaluate(() => {
        const event = document.createEvent('Event');
        event.initEvent('DOMContentLoaded', true, true);
        document.dispatchEvent(event);
    });

    // Verify
    const displayStyle = await page.locator('body').evaluate(el => window.getComputedStyle(el).display);
    expect(displayStyle).toBe('none');
  });
});