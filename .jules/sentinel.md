
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2025-03-10 - Client-Side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) vulnerabilities due to missing server-side `X-Frame-Options` or CSP `frame-ancestors` headers on static deployments.
**Learning:** The CSP `frame-ancestors` directive is ignored when delivered via `<meta>` tags in HTML. Static apps relying only on meta tags for CSP remain vulnerable to clickjacking.
**Prevention:** Implement client-side JavaScript framebusting logic (e.g., `if (window.top !== window.self) { window.top.location = window.self.location; }`) for static applications lacking server-side header configurations.
