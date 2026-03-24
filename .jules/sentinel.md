
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Client-side Framebusting for Static Apps
**Vulnerability:** Clickjacking (UI redressing) vulnerabilities due to lack of `X-Frame-Options` or `Content-Security-Policy: frame-ancestors` HTTP headers.
**Learning:** For static applications without server-side configuration, CSP `frame-ancestors` delivered via `<meta>` tags is ignored by browsers. Therefore, client-side JavaScript framebusting logic is required.
**Prevention:** Hide the page by default (`body { display: none; }`) and use JavaScript to reveal it only if `window.self === window.top`, otherwise break out of the frame via `window.top.location = window.self.location`.
