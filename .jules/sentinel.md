
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-24 - CSP upgrade-insecure-requests
**Vulnerability:** Missing upgrade-insecure-requests directive in CSP.
**Learning:** Explicitly instructing the browser to upgrade HTTP to HTTPS using upgrade-insecure-requests provides defense against mixed content issues.
**Prevention:** Ensure the Content-Security-Policy header includes upgrade-insecure-requests to enforce secure data transmission.
