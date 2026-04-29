
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Client-side Clickjacking Mitigation
**Vulnerability:** The game could be framed by malicious sites leading to clickjacking, but global framebusting breaks legitimate portals like itch.io.
**Learning:** Pure window.self !== window.top checks are too strict for web games that rely on embedding.
**Prevention:** Use a hybrid approach that checks window framing state and validates document.referrer using the URL API against an allowed list of hostnames, wrapped in try/catch to handle cross-origin exceptions.
