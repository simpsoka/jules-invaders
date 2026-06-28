## 2024-06-28 - Canvas Accessibility
**Learning:** Game <canvas> elements lack innate interaction discoverability and fail to capture keystrokes properly when screen readers are active. Custom UI elements often miss focus indicators.
**Action:** Add `role="application"` with an `aria-label` to canvases, ensure focus states via `:focus-visible`, and provide explicit on-screen text hints.
