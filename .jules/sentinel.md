
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Client-Side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) vulnerability due to missing `frame-ancestors` directive (which cannot be delivered via `<meta>` tags).
**Learning:** For static applications lacking server-side HTTP response header configurations, clickjacking must be mitigated using client-side JavaScript framebusting logic.
**Prevention:** Implement a 'deny-by-default' approach by setting `body { display: none; }` in CSS and revealing it via `document.body.style.display = 'block';` in JS only if `window.self === window.top`.
