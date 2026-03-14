
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Client-Side Framebusting for Static Sites
**Vulnerability:** Clickjacking via embedding the site in an iframe.
**Learning:** For static sites without server-configured HTTP headers, the CSP `frame-ancestors` directive is ignored when delivered via a `<meta>` tag, leaving the site vulnerable to UI redressing.
**Prevention:** Implement client-side JavaScript framebusting (`if (window.top !== window.self) { window.top.location = window.self.location; }`) at the top of the main entry script to ensure the page cannot be framed.
