const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to game dimensions
  await page.setViewportSize({ width: 800, height: 600 });

  const gamePath = `file://${path.resolve(__dirname, '../game.html')}`;

  console.log(`Navigating to ${gamePath}`);
  await page.goto(gamePath);

  // Wait for game to initialize (canvas drawing)
  await page.waitForTimeout(2000);

  const screenshotPath = '/home/jules/verification/game_screenshot.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);

  await browser.close();
})();
