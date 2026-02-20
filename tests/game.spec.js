const { test, expect } = require('@playwright/test');
const path = require('path');
const url = require('url');

test.describe('Game Initialization', () => {
  test('should load the game page with essential elements', async ({ page }) => {
    // Navigate to the game.html file
    const filePath = path.resolve(__dirname, '../game.html');
    const fileUrl = url.pathToFileURL(filePath).toString();
    await page.goto(fileUrl);

    // Check title
    await expect(page).toHaveTitle('Jules Invaders');

    // Check game container
    const container = page.locator('#gameContainer');
    await expect(container).toBeVisible();

    // Check heading
    const heading = container.locator('h1');
    await expect(heading).toHaveText('Jules Invaders');
    await expect(heading).toBeHidden();

    // Check canvas
    const canvas = page.locator('#gameCanvas');
    await expect(canvas).toBeVisible();

    // Check that the canvas has correct dimensions
    await expect(canvas).toHaveAttribute('width', '800');
    await expect(canvas).toHaveAttribute('height', '600');

    // Check play again button exists but is hidden initially
    const playAgainBtn = page.locator('#playAgainBtn');
    await expect(playAgainBtn).toBeHidden();

    // Check mobile controls exist but are hidden (on desktop by default)
    const mobileControls = page.locator('#mobileControls');
    await expect(mobileControls).toBeHidden();
  });
});
