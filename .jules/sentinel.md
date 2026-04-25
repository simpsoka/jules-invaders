
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2025-04-25 - Client-Side Anti-Clickjacking (Framebusting)
**Vulnerability:** Static HTML web games lacking HTTP header controls (`X-Frame-Options` / `frame-ancestors`) are vulnerable to clickjacking.
**Learning:** Blocking all iframes via `window.self === window.top` breaks legitimate distribution on gaming portals (like itch.io).
**Prevention:** Implement client-side framebusting by hiding the `body` by default (`display: none`), then unhiding it via JS only if the window is top-level or the `document.referrer` strictly matches an allowed portal's hostname.
