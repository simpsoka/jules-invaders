
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2025-03-12 - Framebusting for Clickjacking Mitigation
**Vulnerability:** Clickjacking (UI redressing) risk due to missing or ignored CSP `frame-ancestors` when enforced via `<meta>` tags.
**Learning:** CSP `frame-ancestors` directives cannot be enforced using `<meta>` tags. For static applications without server HTTP headers, client-side JS framebusting is necessary to prevent the app from being embedded in malicious iframes.
**Prevention:** Always implement client-side framebusting (`if (window.top !== window.self) { window.top.location = window.self.location; }`) when server headers are unavailable.