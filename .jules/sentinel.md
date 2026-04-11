
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-24 - Client-side clickjacking mitigation
**Vulnerability:** Static game applications are often vulnerable to clickjacking if they do not prevent being framed by malicious sites.
**Learning:** For web games distributed on portals like itch.io, strict framebusting (`window.top === window.self`) breaks legitimate distribution. We must allowlist trusted referrers.
**Prevention:** Implement client-side framebusting using `display: none` by default, but allow exceptions based on a strictly validated `document.referrer` for trusted gaming domains.
