const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Clickjacking Mitigation', () => {
  test('game loads and sets display to block when not framed', async ({ page }) => {
    const gameUrl = `file://${path.resolve(__dirname, '../game.html')}`;
    await page.goto(gameUrl);
    // Check that display becomes block
    const display = await page.evaluate(() => document.body.style.display);
    expect(display).toBe('block');
  });

  test('script logic rejects unauthorized frames', async ({ page }) => {
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');

    const result = await page.evaluate((scriptText) => {
      let displayState = 'none';
      let errorLogged = false;

      const mockWindow = {
        self: {},
        top: {}, // different, simulating framed
        addEventListener: () => {},
        document: {}
      };

      const mockDocument = {
        referrer: 'https://evil.com', // Unauthorized referrer
        body: {
          dataset: { gamemode: 'play' },
          style: {
            get display() { return displayState; },
            set display(val) { displayState = val; }
          }
        },
        addEventListener: (event, handler) => {
          if (event === 'DOMContentLoaded') {
            handler();
          }
        },
        getElementById: () => ({ getContext: () => ({}) })
      };

      // Provide a minimal proxy for window and document to capture logic
      // without causing ReferenceErrors for canvas elements etc.
      mockWindow.document = mockDocument;

      try {
        const fn = new Function('window', 'document', scriptText);
        fn(mockWindow, mockDocument);
      } catch (e) {
        // We just want to execute the DOMContentLoaded handler
      }

      return { displayState, errorLogged };
    }, scriptContent);

    expect(result.displayState).toBe('none');
  });
});
