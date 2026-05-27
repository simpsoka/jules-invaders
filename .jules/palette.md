## 2026-05-27 - Standardize Focus States
**Learning:** Custom interactive elements on dark backgrounds need distinct, high-contrast focus indicators. Using a standard dashed white outline with offset provides clear keyboard navigation feedback without relying on default browser styles which may blend into the dark canvas.
**Action:** Always include `:focus-visible { outline: 2px dashed #FFFFFF; outline-offset: 4px; }` for buttons and interactive links in this dark-themed app.
