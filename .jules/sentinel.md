
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-10-24 - Implement Client-Side Framebusting
**Vulnerability:** Clickjacking (UI Redressing) due to missing frame-ancestors CSP and lack of client-side mitigation.
**Learning:** For static applications that lack server-side HTTP response header configurations, clickjacking must be mitigated using client-side JavaScript framebusting logic rather than relying on the CSP `frame-ancestors` directive, which is ignored when delivered via `<meta>` tags.
**Prevention:** Implement client-side framebusting by setting `body { display: none; }` in CSS and revealing it via `document.body.style.display = 'block';` in JS only if `window.self === window.top`.
