## 2024-05-24 - Validate localStorage Data

**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2026-05-02 - Client-Side Clickjacking Mitigation

**Vulnerability:** Application could be loaded in malicious iframes, enabling clickjacking attacks.
**Learning:** Trivial string-matching for referrers can be bypassed. URL parsing must be used and wrapped in a `try/catch` block to handle invalid URLs or cross-origin errors without crashing the script.
**Prevention:** Implement framebusting by setting `body { display: none; }` initially and revealing it only if `window.self === window.top` or if the parsed `document.referrer` hostname strictly matches allowed domains (e.g., `itch.io`, `.itch.io`).
