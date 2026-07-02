## 2025-02-12 - Canvas Game Accessibility and Discoverability
**Learning:** Canvas-based games lack innate interaction discoverability and screen reader support out-of-the-box.
**Action:** Add `role="application"` with an `aria-label` to `<canvas>` elements to direct keystrokes to the game, and include explicit HTML text hints for controls outside the canvas to improve discoverability.
