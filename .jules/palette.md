## 2026-05-17 - Added focus-visible states
**Learning:** Relying on page.locator().focus() in Playwright test scripts may only simulate programmatic focus and fail to activate keyboard-only visible outlines.
**Action:** Use page.keyboard.press('Tab') instead to properly trigger and verify :focus-visible CSS states during frontend verification.
