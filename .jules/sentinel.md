
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-24 - Framebusting Bypass via Substring Matching
**Vulnerability:** Clickjacking framebusting logic using `document.referrer.includes('domain.com')` can be trivially bypassed by an attacker embedding the required string in their own URL (e.g., `https://attacker.com/?domain.com`).
**Learning:** Security logic relying on URL origins must parse the URL using the `URL` API and strictly validate the `hostname` (and optionally `origin`), rather than using loose substring matches.
**Prevention:** Use `new URL(document.referrer)` and check `hostname === 'domain.com' || hostname.endsWith('.domain.com')`.
