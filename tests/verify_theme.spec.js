const { test, expect } = require('@playwright/test');
const path = require('path');

test('Check Valentine theme colors', async ({ page }) => {
  const filePath = 'file://' + path.resolve(__dirname, '../index.html');

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore network errors related to local file access restrictions or missing assets
      if (!text.includes('Failed to load resource')) {
        consoleErrors.push(text);
      }
    }
  });

  await page.goto(filePath);

  // Check for console errors (excluding resource loading errors)
  expect(consoleErrors).toEqual([]);

  // Check body color
  const bodyColor = await page.evaluate(() => {
    return getComputedStyle(document.body).color;
  });

  // rgb(255, 20, 147) is #FF1493 (DeepPink)
  expect(bodyColor).toBe('rgb(255, 20, 147)');

  // Check canvas border color
  const canvasBorderColor = await page.evaluate(() => {
    return getComputedStyle(document.getElementById('gameCanvas')).borderColor;
  });
  expect(canvasBorderColor).toBe('rgb(255, 20, 147)');
});
