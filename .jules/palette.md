## 2024-04-27 - Keyboard Navigation Focus
**Learning:** Custom game UIs on canvas-based apps often neglect native HTML overlay elements' keyboard focus visibility against dark backgrounds (#000), making keyboard-only navigation extremely difficult.
**Action:** Always implement explicit `:focus-visible` styles with high contrast (e.g., `outline: 2px dashed #FFFFFF`) for all custom HTML buttons overlaid on game canvas interfaces to ensure WCAG compliance for focus visibility.
