
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Safe Clickjacking Mitigation
**Vulnerability:** Overly strict framebusting logic breaks legitimate game distribution embedding.
**Learning:** Blocking all iframes (via `window.self === window.top`) prevents game distribution on legitimate portals like itch.io.
**Prevention:** Implement safe framebusting that explicitly allows trusted referrers (e.g., `itch.io`) via strict URL parsing.
