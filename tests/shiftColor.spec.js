const { test, expect } = require('@playwright/test');
const { shiftColor } = require('../utils.js');

test.describe('shiftColor Utility', () => {

  test('should return the same color (normalized) for level 1 if within range', () => {
    // For pure Red #FF0000: H=0, S=1, L=0.5.
    // Level 1: Hue shift = 0, Lightness shift = 0.
    // Clamp: L = min(0.9, 0.5) = 0.5. Max(0.1, 0.5) = 0.5.
    // So output should be same.
    const hex = '#ff0000';
    const shifted = shiftColor(hex, 1);
    expect(shifted.toLowerCase()).toBe(hex.toLowerCase());
  });

  test('should modify color for level 2', () => {
    const hex = '#ff0000';
    const shifted = shiftColor(hex, 2);
    expect(shifted.toLowerCase()).not.toBe(hex.toLowerCase());
  });

  test('should clamp lightness for bright colors even at level 1', () => {
    // White #FFFFFF is L=1.0.
    // logic: l = Math.max(0.1, Math.min(0.9, l ...))
    // So L becomes 0.9.
    // Result should not be #FFFFFF.
    const white = '#ffffff';
    const shifted = shiftColor(white, 1);
    expect(shifted.toLowerCase()).not.toBe(white.toLowerCase());
    // L=0.9, S=0 (achromatic). RGB should be around 230 (0.9 * 255 = 229.5)
    // 230 in hex is E6. So #E6E6E6.
    expect(shifted.toLowerCase()).toBe('#e6e6e6');
  });

  test('should maintain valid hex format', () => {
    const hex = '#123456';
    for (let i = 1; i <= 10; i++) {
      const shifted = shiftColor(hex, i);
      expect(shifted).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  test('should handle black correctly', () => {
    // Black #000000 is L=0.
    // Clamp min 0.1. So L becomes 0.1.
    // Should become dark gray.
    const black = '#000000';
    const shifted = shiftColor(black, 1);
    expect(shifted.toLowerCase()).not.toBe(black.toLowerCase());
    // 0.1 * 255 = 25.5 -> 26 -> 1A. So #1A1A1A.
    expect(shifted.toLowerCase()).toBe('#1a1a1a');
  });

});
