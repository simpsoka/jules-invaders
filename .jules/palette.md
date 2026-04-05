## 2024-05-24 - Focus States on Dark Backgrounds
**Learning:** Default browser focus rings are often completely invisible against stark black backgrounds, making keyboard navigation for standard interactive elements (like `<a>` and `<button>`) impossible for users relying on visual feedback.
**Action:** Apply an explicit `:focus-visible` rule using high-contrast dashed outlines (e.g., `outline: 2px dashed #FFFFFF; outline-offset: 4px;`) as a reusable pattern for all interactive elements in this dark-themed design system.
