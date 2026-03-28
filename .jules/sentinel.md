
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2026-03-05 - Framebusting for Clickjacking Mitigation
**Vulnerability:** The game was susceptible to clickjacking (UI redressing) as it lacked protections against being embedded in an iframe.
**Learning:** For static sites where HTTP response headers (like `X-Frame-Options` or CSP `frame-ancestors`) cannot be configured by the server, the CSP `frame-ancestors` directive cannot be enforced via HTML `<meta>` tags. It is simply ignored by browsers.
**Prevention:** Implement client-side JavaScript framebusting logic (e.g., `if (window.top !== window.self) { window.top.location = window.self.location; }`) as a fallback to prevent the application from being loaded within an unauthorized iframe.
