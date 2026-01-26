const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Game Levels', () => {
  test('Level patterns change alien count', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../game.html');
    await page.goto(`file://${filePath}`);

    // Check initial level (Level 1 - Block)
    // 11 cols * 5 rows = 55 aliens.
    const level1Count = await page.evaluate(() => {
      return aliens.flat().filter(a => a.status === 1).length;
    });

    console.log('Level 1 count:', level1Count);
    expect(level1Count).toBe(55);

    // Force transition to Level 2
    await page.evaluate(() => {
      level = 2;
      resetAliensForNextLevel();
    });

    // Check level 2 count (Diamond)
    // Based on the pattern Math.abs(c - 5) + Math.abs(r - 2) <= 3
    // The count should be 23.
    const level2Count = await page.evaluate(() => {
      return aliens.flat().filter(a => a.status === 1).length;
    });

    console.log('Level 2 count:', level2Count);

    // It should be different from Level 1
    expect(level2Count).not.toBe(55);

    // It should be 23 if the pattern is correct
    expect(level2Count).toBe(23);
  });
});
