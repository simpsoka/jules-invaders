const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Clickjacking Mitigation', () => {
  test('should set body display to block when loaded directly', async ({ page }) => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    await page.goto(`file://${htmlPath}`);
    await expect(page.locator('body')).toHaveCSS('display', 'block');
  });

  test('should keep body hidden when framed by unauthorized origin', async ({ page }) => {
    await page.goto('about:blank');
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');

    const isBodyHidden = await page.evaluate((scriptContent) => {
      const dummyBody = document.createElement('body');
      dummyBody.style.display = 'none';
      dummyBody.dataset = { gamemode: 'demo' };

      const mockDocument = {
        addEventListener: (event, callback) => {
          if (event === 'DOMContentLoaded') {
            callback();
          }
        },
        referrer: 'https://evil.com',
        body: dummyBody,
        getElementById: (id) => {
          if (id === 'gameCanvas') return { getContext: () => ({}) };
          return { addEventListener: () => {} };
        },
      };

      const mockWindow = {
        self: {},
        top: {} // Not equal
      };

      try {
        const fn = new Function('window', 'document', scriptContent);
        fn(mockWindow, mockDocument);
      } catch (e) {
        console.error(e);
      }

      return dummyBody.style.display === 'none';
    }, scriptContent);

    expect(isBodyHidden).toBe(true);
  });

  test('should set body display to block when framed by allowed origin', async ({ page }) => {
    await page.goto('about:blank');
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf-8');

    const isBodyVisible = await page.evaluate((scriptContent) => {
      const dummyBody = document.createElement('body');
      dummyBody.style.display = 'none';
      dummyBody.dataset = { gamemode: 'demo' };

      const mockDocument = {
        addEventListener: (event, callback) => {
          if (event === 'DOMContentLoaded') {
            callback();
          }
        },
        referrer: 'https://user.itch.io',
        body: dummyBody,
        getElementById: (id) => {
          if (id === 'gameCanvas') return { getContext: () => ({}) };
          return { addEventListener: () => {} };
        },
      };

      const mockWindow = {
        self: {},
        top: {}
      };

      try {
        const fn = new Function('window', 'document', scriptContent);
        fn(mockWindow, mockDocument);
      } catch (e) {
        console.error(e);
      }

      return dummyBody.style.display === 'block';
    }, scriptContent);

    expect(isBodyVisible).toBe(true);
  });
});
