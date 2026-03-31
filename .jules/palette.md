## 2024-03-31 - Visible Focus Outline Pattern
**Learning:** Custom interactive elements (buttons, links) in the game UI lack visible focus states, making keyboard navigation difficult or impossible to track against the dark background (#000). Standard browser focus rings are often invisible in this context.
**Action:** Added standard `:focus-visible` outline (`2px dashed #FFFFFF` with `4px` outline-offset) to ensure all interactive elements are clearly visible when navigated via keyboard.
