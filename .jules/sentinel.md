
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Static App Clickjacking Mitigation
**Vulnerability:** UI redressing (clickjacking) where an attacker embeds the app in an iframe, tricking users into unintended actions.
**Learning:** For static sites without server-side HTTP headers (like `X-Frame-Options` or CSP `frame-ancestors`), CSP `<meta>` tags are insufficient to prevent framing.
**Prevention:** Implement client-side framebusting logic using JavaScript (e.g., checking `window.self === window.top` and redirecting) combined with CSS to hide the `<body>` initially (`visibility: hidden` to avoid white flashes) until framebusting confirms the page is top-level. Early `return` prevents further execution.
