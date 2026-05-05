
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Framebusting / Clickjacking mitigation
**Vulnerability:** The application did not prevent itself from being embedded in cross-origin iframes, opening it up to clickjacking attacks.
**Learning:** In the absence of an explicit `X-Frame-Options` or `Content-Security-Policy: frame-ancestors` header (often difficult to set for purely static sites served without a custom backend), a client-side framebusting script is a viable defense-in-depth measure.
**Prevention:** Implement client-side framebusting by hiding the `body` initially via CSS, and revealing it in JS only if `window.self === window.top` or the `document.referrer` matches allowed hostnames, wrapped in a `try/catch` to handle cross-origin exceptions gracefully.
