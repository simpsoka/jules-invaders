const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

test.describe('Clickjacking Mitigation', () => {
  const gameUrl = pathToFileURL(path.resolve(__dirname, '../game.html')).toString();
  const scriptPath = path.resolve(__dirname, '../script.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  test('should set display block when not framed', async ({ page }) => {
    await page.goto(gameUrl);
    // Waiting for DOMContentLoaded and our framebusting script to run
    await page.waitForFunction(() => window.getComputedStyle(document.body).display === 'block');
    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });

  test('should set display block when framed by trusted domain', async ({ page }) => {
    await page.goto('about:blank');
    await page.evaluate((content) => {
      document.body.innerHTML = '<div data-gamemode="demo"></div><canvas id="gameCanvas"></canvas><div id="playAgainBtn"></div><div id="mobileControls"></div><div id="leftBtn"></div><div id="rightBtn"></div><div id="fireBtn"></div>';
      document.body.style.display = 'none';
      const mockWindow = {
        self: 'iframe',
        top: 'top',
        navigator: window.navigator,
        addEventListener: () => {},
        innerWidth: 800,
        innerHeight: 600,
        getComputedStyle: window.getComputedStyle,
      };
      const mockDocument = {
        referrer: 'https://itch.io/game',
        body: document.body,
        getElementById: (id) => document.getElementById(id),
        createElement: (t) => document.createElement(t),
        addEventListener: (event, handler) => {
          if (event === 'DOMContentLoaded') {
            handler();
          }
        }
      };
      const testFunc = new Function('window', 'document', content);
      testFunc(mockWindow, mockDocument);
    }, scriptContent);

    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('block');
  });

  test('should not set display block when framed by untrusted domain', async ({ page }) => {
    await page.goto('about:blank');
    await page.evaluate((content) => {
      document.body.innerHTML = '<div data-gamemode="demo"></div><canvas id="gameCanvas"></canvas><div id="playAgainBtn"></div><div id="mobileControls"></div><div id="leftBtn"></div><div id="rightBtn"></div><div id="fireBtn"></div>';
      document.body.style.display = 'none';
      const mockWindow = {
        self: 'iframe',
        top: 'top',
        navigator: window.navigator,
        addEventListener: () => {},
        innerWidth: 800,
        innerHeight: 600,
        getComputedStyle: window.getComputedStyle,
      };
      const mockDocument = {
        referrer: 'https://evil.com',
        body: document.body,
        getElementById: (id) => document.getElementById(id),
        createElement: (t) => document.createElement(t),
        addEventListener: (event, handler) => {
          if (event === 'DOMContentLoaded') {
            handler();
          }
        }
      };
      const testFunc = new Function('window', 'document', content);
      testFunc(mockWindow, mockDocument);
    }, scriptContent);

    const display = await page.evaluate(() => window.getComputedStyle(document.body).display);
    expect(display).toBe('none');
  });
});
