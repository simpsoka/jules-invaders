## 2024-05-24 - High Contrast Focus States in Dark Mode UIs
**Learning:** Default browser focus rings are often invisible or low-contrast against solid black backgrounds (#000) typical in retro/arcade games, significantly impairing keyboard navigation.
**Action:** Standardize custom `:focus-visible` outlines using a high-contrast dashed white border (`2px dashed #FFFFFF`) with an offset (`4px`) on interactive elements (buttons, links) in dark themes to ensure WCAG compliant visibility.
