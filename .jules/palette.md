## 2023-10-27 - Canvas Game Accessibility and Interactions
**Learning:** Canvas-based games lack innate interaction discoverability, and custom UI elements over canvas can block interactions. Furthermore, custom buttons often lack focus visible styles for keyboard navigation.
**Action:** Add explicit HTML text hints for core controls outside the `<canvas>` element. Apply `pointer-events: none` to overlays to ensure they do not block mouse/touch events. Ensure custom interface elements have clear `:focus-visible` styles.
