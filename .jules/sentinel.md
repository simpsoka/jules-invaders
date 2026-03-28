
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-03-29 - Framebusting Mitigation for Clickjacking
**Vulnerability:** Clickjacking (UI redressing) vulnerabilities due to the absence of X-Frame-Options or frame-ancestors directives, enabling attackers to embed the game inside an iframe.
**Learning:** For static sites without a server returning HTTP response headers, CSP meta tags are ineffective for frame-ancestors, requiring client-side JS solutions.
**Prevention:** Use client-side framebusting logic: initial `body { display: none; }` and reveal using `if (window.self === window.top) document.body.style.display = 'block';`.
