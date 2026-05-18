## 2024-05-18 - Focus indicators in dark retro themes
**Learning:** Custom interactive elements (buttons, links) in dark themes with thick retro borders often swallow default focus indicators, leading to poor keyboard accessibility.
**Action:** Use a standard `:focus-visible` outline (`2px dashed #FFFFFF` with `4px` offset) to ensure accessibility and visibility against the dark background for custom elements.
