
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Client-Side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) due to missing `frame-ancestors` CSP directive.
**Learning:** For static applications that lack server-side HTTP response header configurations, CSP `frame-ancestors` cannot be enforced via `<meta>` tags.
**Prevention:** Implement client-side JavaScript framebusting logic (`if (window.top !== window.self) { window.top.location.replace(window.self.location.href); }`) to prevent the application from being embedded in an iframe.
