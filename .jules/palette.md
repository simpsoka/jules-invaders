## 2024-05-14 - Improve screen reader accessibility and keyboard navigation
**Learning:** `html` tags without a `lang` attribute break basic screen reader functionality, and custom UI components on dark backgrounds need explicit `:focus-visible` styles as default browser outlines often lack contrast and visibility.
**Action:** Always verify `lang` is present on `html` tags and apply a high-contrast `:focus-visible` standard (`2px dashed #FFFFFF`, `4px` offset) to custom interactive elements against dark themes.
