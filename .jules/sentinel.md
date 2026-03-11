
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Mitigate Clickjacking via Framebusting
**Vulnerability:** Application is susceptible to Clickjacking (UI Redressing) because the `frame-ancestors` CSP directive is ignored when specified via a `<meta>` tag, and the site is purely static HTML without HTTP response headers.
**Learning:** For static sites deployed without control over HTTP headers, `<meta>` CSP tags alone are insufficient to prevent framing and clickjacking attacks.
**Prevention:** Implement client-side JavaScript framebusting logic (e.g., `if (window.top !== window.self) { window.top.location = window.self.location; }`) at the very top of the entry point script to ensure the site cannot be loaded inside an iframe.
