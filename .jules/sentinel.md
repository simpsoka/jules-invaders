
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Framebusting for Static Sites
**Vulnerability:** The game was susceptible to clickjacking (UI redressing) because the `frame-ancestors` CSP directive cannot be enforced via a `<meta>` tag.
**Learning:** In static frontend applications without control over HTTP response headers, CSP meta tags cannot provide framing protection.
**Prevention:** Implement JavaScript-based framebusting (`if (window.top !== window.self) { window.top.location = window.self.location; }`) as a defense-in-depth measure to prevent the site from being embedded in malicious iframes.
