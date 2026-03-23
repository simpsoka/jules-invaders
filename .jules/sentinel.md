
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-24 - Client-side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) vulnerability where the application lacks CSP frame-ancestors headers and can be embedded in an iframe.
**Learning:** For static apps without backend control of HTTP headers, CSP meta tags are insufficient for frame-ancestors. A client-side framebusting strategy is required.
**Prevention:** Implement "body { display: none; }" in CSS and reveal it via JavaScript only if "window.self === window.top".
