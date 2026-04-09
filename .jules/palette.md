## 2024-04-09 - Simulating Keyboard Navigation for `:focus-visible` in Playwright
**Learning:** In Playwright verification scripts, programmatically calling `.focus()` on an element may not trigger the `:focus-visible` pseudo-class, which relies on heuristics to determine if focus was triggered via keyboard interaction.
**Action:** To successfully capture and verify `:focus-visible` CSS states, simulate actual keyboard navigation using `page.keyboard.press('Tab')` rather than relying on programmatic `.focus()`.
