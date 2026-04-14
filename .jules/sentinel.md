
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-18 - Clickjacking (Framebusting) Mitigation
**Vulnerability:** The application was susceptible to clickjacking attacks as it could be loaded inside an unauthorized iframe.
**Learning:** Purely frontend games distributed on gaming portals (like itch.io) cannot use strict `X-Frame-Options: DENY` HTTP headers if they must be embedded. Client-side framebusting offers a middle-ground solution.
**Prevention:** Hide the `body` via CSS (`display: none;`) by default and reveal it via JavaScript only if `window.self === window.top` or if `document.referrer` matches an allowed host (e.g., `itch.io`), ensuring proper try-catch handling for cross-origin errors.
