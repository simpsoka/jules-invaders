## 2024-06-19 - Add explicit keyboard hints and focus visible styles
**Learning:** Canvas-based games lack innate interaction discoverability, leaving keyboard and screen reader users unsure of how to interact. When enhancing accessibility, provide explicit HTML text hints for core controls outside the `<canvas>` element and ensure custom interface elements have clear `:focus-visible` styles.
**Action:** For all future canvas or WebGL interfaces, overlay non-interactive `pointer-events: none` HTML hints for controls, and strictly implement `:focus-visible` to support keyboard navigation.
