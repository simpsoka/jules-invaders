
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-25 - Framebusting Limitations on Portals
**Vulnerability:** Game embedded in malicious unauthorized iframes (Clickjacking).
**Learning:** Strict `window.self === window.top` framebusting breaks legitimate embedding on game portals (like itch.io), which is a core distribution method for web games.
**Prevention:** Implement conditional framebusting that explicitly allows recognized, trusted referrers (e.g., `itch.io`) by parsing `document.referrer` securely via the `URL` API.
