## 2024-05-27 - Keyboard Navigation Focus States
**Learning:** Default browser focus states are often completely invisible against dark backgrounds (like the black background in this space invaders game), rendering interactive elements inaccessible to keyboard users.
**Action:** Always add a high-contrast custom `:focus-visible` state (like a dashed white outline with an offset) to interactive elements (`button`, `a`) when working with dark or custom backgrounds.
