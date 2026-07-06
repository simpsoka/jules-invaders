## 2024-05-24 - Canvas Accessibility & Discoverability
**Learning:** Canvas-based games lack innate interaction discoverability and screen readers intercept keystrokes for standard page navigation unless role="application" is used.
**Action:** Always provide explicit HTML text hints for core controls outside the <canvas> element and ensure <canvas> elements have role="application" and an aria-label to pass keystrokes directly to the game.
