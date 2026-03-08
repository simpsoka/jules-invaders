
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2026-03-08 - Client-Side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) vulnerabilities due to the absence of the `frame-ancestors` CSP directive.
**Learning:** For static applications lacking server-side HTTP response header configuration, clickjacking must be mitigated client-side because the `frame-ancestors` directive is ignored when delivered via `<meta>` tags.
**Prevention:** Implement client-side framebusting logic (e.g., `if (window.top !== window.self) { window.top.location = window.self.location; }`) in the primary JavaScript bundle to prevent embedding in malicious iframes.
