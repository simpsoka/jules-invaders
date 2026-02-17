// Utility functions for Jules Invaders

/**
 * Shifts a hex color based on the current level.
 * Converts Hex -> RGB -> HSL, applies shifts to Hue and Lightness, then converts back to Hex.
 *
 * @param {string} hex - The input hex color (e.g., "#FF0000").
 * @param {number} level - The current game level.
 * @returns {string} - The shifted hex color.
 */
function shiftColor(hex, level) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Apply level-based shift
  h = (h + (level - 1) * 0.03) % 1; // Hue shift
  l = Math.max(0.1, Math.min(0.9, l - (level - 1) * 0.01)); // Lightness shift

  // Convert HSL to RGB
  let r2, g2, b2;
  if (s === 0) {
    r2 = g2 = b2 = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB to hex
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}

// Export for Node.js environments (like tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { shiftColor };
}
