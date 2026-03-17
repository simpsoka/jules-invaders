
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Prevent Clickjacking UI Redressing
**Vulnerability:** Missing X-Frame-Options or CSP frame-ancestors headers allowed the static application to be embedded in an iframe, leading to potential clickjacking (UI redressing) attacks.
**Learning:** For static sites where HTTP response headers cannot be configured, CSP `<meta>` tags are insufficient as they do not support the `frame-ancestors` directive.
**Prevention:** Implement client-side framebusting logic (`if (window.top !== window.self)`) as a fallback defense-in-depth measure to prevent unauthorized framing.
