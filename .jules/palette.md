## 2024-05-22 - Add focus-visible states to interactive elements
**Learning:** Custom interactive elements on dark backgrounds in the game UI can easily lose default focus rings, severely impacting keyboard navigation visibility.
**Action:** Always apply a high-contrast focus indicator (e.g., `2px dashed #FFFFFF` with `4px` offset) using `:focus-visible` for buttons and links to ensure accessibility.
