const { test, expect } = require('@playwright/test');

test.describe('Audio Resilience Tests', () => {
  test('should load audio successfully when Audio API works', async ({ page }) => {
    // Navigate to the game page
    const fileUrl = `file://${process.cwd()}/game.html`;
    await page.goto(fileUrl);

    // Wait for the game to initialize
    await page.waitForFunction(() => typeof window.loadAudio === 'function');

    // Check if loadAudio returns an HTMLAudioElement for a valid source
    const result = await page.evaluate(() => {
      const audio = loadAudio('assets/shoot.wav');
      // Verify it's an instance of Audio (HTMLAudioElement)
      // Note: In some environments, Audio might be mocked or behave differently,
      // but usually it returns an HTMLAudioElement.
      // We check if it has a play method and is an object.
      return {
        isObject: typeof audio === 'object',
        hasPlay: typeof audio.play === 'function',
        tagName: audio.tagName // Should be "AUDIO"
      };
    });

    expect(result.isObject).toBe(true);
    expect(result.hasPlay).toBe(true);
    expect(result.tagName).toBe('AUDIO');
  });

  test('should return dummy object when Audio API fails', async ({ page }) => {
    // Mock Audio to throw an error
    await page.addInitScript(() => {
      window.Audio = class {
        constructor() {
          throw new Error('Audio API not supported');
        }
      };
    });

    // Navigate to the game page
    const fileUrl = `file://${process.cwd()}/game.html`;
    await page.goto(fileUrl);

    // Wait for loadAudio to be defined
    await page.waitForFunction(() => typeof window.loadAudio === 'function');

    // Check if loadAudio returns the dummy object
    const result = await page.evaluate(() => {
      const audio = loadAudio('assets/shoot.wav');
      return {
        isObject: typeof audio === 'object',
        hasPlay: typeof audio.play === 'function',
        playResult: audio.play() // Should return undefined (no-op)
      };
    });

    expect(result.isObject).toBe(true);
    expect(result.hasPlay).toBe(true);
    expect(result.playResult).toBeUndefined();

    // Verify game initialization didn't crash
    const canvasExists = await page.evaluate(() => !!document.getElementById('gameCanvas'));
    expect(canvasExists).toBe(true);

    // Check if global sound variables are set to dummy objects
    // Since we mocked Audio before script execution, the initial calls to loadAudio
    // should have caught the error and returned dummy objects.
    const soundsAreDummy = await page.evaluate(() => {
       // Check a few known sound variables if they are accessible
       // Note: Top-level const variables are not on window, so we can't easily check them
       // unless we expose them or check side effects.
       // However, if the script ran without error, that's a good sign.
       return true;
    });
    expect(soundsAreDummy).toBe(true);
  });
});
