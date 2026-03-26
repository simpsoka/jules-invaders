
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.
## 2024-05-24 - Framebusting for Clickjacking Mitigation
**Vulnerability:** The application was vulnerable to clickjacking because it lacked framebusting logic and the CSP 'frame-ancestors' directive is ignored when delivered via '<meta>' tags.
**Learning:** Client-side JavaScript framebusting logic is required for static applications that lack server-side HTTP response header configurations.
**Prevention:** Always implement client-side framebusting for static sites to prevent UI redressing vulnerabilities.
