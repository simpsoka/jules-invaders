## 2025-02-23 - Canvas Game Accessibility
**Learning:** Canvas-based games lack innate interaction discoverability and screen readers often intercept keystrokes intended for the game. Additionally, strict design systems can make adding focus states difficult.
**Action:** Always add `role="application"` and an `aria-label` to `<canvas>` elements to direct keystrokes to the game. Provide HTML text hints for controls outside the canvas, and use `:focus-visible` alongside `:hover` or `:active` to add focus states without breaking design system boundaries.
