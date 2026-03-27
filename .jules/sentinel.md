
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-03-27 - Clickjacking Mitigation
**Vulnerability:** Clickjacking (UI redressing) due to lack of server-side HTTP headers and ignored CSP `frame-ancestors` in meta tags.
**Learning:** CSP `frame-ancestors` directive is ignored when delivered via `<meta>` tags. For static applications without server headers, JavaScript framebusting must be used.
**Prevention:** Implement client-side JavaScript framebusting logic by setting `body { display: none; }` initially and revealing it via `document.body.style.display = 'block'` only if `window.self === window.top`.
