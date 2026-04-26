
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-04-26 - Framebusting for Web Games
**Vulnerability:** Missing clickjacking protection allows the game to be embedded in malicious iframes.
**Learning:** Standard strict framebusting (`window.self === window.top`) breaks legitimate distribution on gaming portals like itch.io which rely on iframes.
**Prevention:** Implement origin-aware framebusting that explicitly allows framing from authorized domains (e.g., `.itch.io`) by parsing `document.referrer` using the URL API while failing securely.
