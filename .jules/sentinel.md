
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Client-side clickjacking mitigation
**Vulnerability:** UI redressing (clickjacking) due to lack of server-side X-Frame-Options or CSP frame-ancestors support.
**Learning:** CSP frame-ancestors is ignored in <meta> tags, requiring client-side framebusting for static apps.
**Prevention:** Implement client-side framebusting logic (display: none by default, revealed via JS if window.self === window.top).
