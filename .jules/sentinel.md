
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-06-06 - Enforce upgrade-insecure-requests in CSP
**Vulnerability:** Missing defense against mixed content (HTTP resources loaded on HTTPS).
**Learning:** In static, client-side applications, enforcing HTTPS using upgrade-insecure-requests in CSP meta tags provides defense-in-depth against mixed content vulnerabilities.
**Prevention:** Always include `upgrade-insecure-requests;` in the Content-Security-Policy meta tags.
