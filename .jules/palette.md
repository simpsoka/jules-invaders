## 2024-07-01 - Canvas Accessibility and Focus States
**Learning:** Canvas-based games lack innate interaction discoverability and screen readers can intercept keystrokes meant for the game. Additionally, strict design systems can lack keyboard focus indicators.
**Action:** Always add role="application" and an aria-label to the canvas to pass keystrokes to the game. Use :focus-visible appended to :hover/:active rules for elegant keyboard accessibility without custom classes. Place text hints for controls on static overlay screens to avoid overlapping dynamic game elements.
