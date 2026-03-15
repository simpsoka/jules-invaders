
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Framebusting for Clickjacking Mitigation
**Vulnerability:** Clickjacking (UI redressing) vulnerabilities due to lack of server-side HTTP headers.
**Learning:** For static applications that lack server-side HTTP response header configurations, the CSP `frame-ancestors` directive cannot be enforced via `<meta>` tags.
**Prevention:** Implement client-side JavaScript framebusting logic (`if (window.top !== window.self) { window.top.location = window.self.location; }`) at the top of the main script.
