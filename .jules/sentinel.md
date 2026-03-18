
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2026-03-18 - Clickjacking via iFrame (UI Redressing)
**Vulnerability:** Application could be embedded in an attacker's iframe because CSP `frame-ancestors` directive is ignored when delivered via `<meta>` tags in static sites.
**Learning:** For static sites lacking server HTTP response headers, CSP meta tags are insufficient for clickjacking defense.
**Prevention:** Implement client-side framebusting: Hide the document body by default using CSS (`body { display: none; }`) and reveal it via JavaScript only if `window.self === window.top`.
