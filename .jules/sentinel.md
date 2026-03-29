
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-11-20 - Client-Side Framebusting for Static Sites
**Vulnerability:** Clickjacking (UI Redressing) due to lack of `X-Frame-Options` or functional `Content-Security-Policy` `frame-ancestors` header on statically hosted pages.
**Learning:** `frame-ancestors` inside a `<meta>` tag is ignored by browsers. Static applications require client-side framebusting to mitigate clickjacking.
**Prevention:** Hide the `body` by default (`display: none`), then use JavaScript (`window.self === window.top`) to unhide it or redirect the top window if framed.
