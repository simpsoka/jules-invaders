
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-25 - Framebusting with Trusted Origins
**Vulnerability:** Game is susceptible to clickjacking attacks due to lack of iframe protections.
**Learning:** Strict window.self === window.top checks block legitimate embedding on gaming portals. Allow-listing domains via document.referrer parsed by URL API prevents string-matching bypasses.
**Prevention:** Implement client-side framebusting that hides the body by default and validates the referrer hostname before revealing it, ensuring legitimate distribution methods remain functional.
