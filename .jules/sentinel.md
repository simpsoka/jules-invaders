
## 2024-05-24 - Validate localStorage Data
**Vulnerability:** Game state corruption via unvalidated `localStorage` high score values (e.g., negative numbers, NaN).
**Learning:** Data retrieved from client-side storage should be treated as untrusted user input and verified.
**Prevention:** Use `parseInt(data, 10)` and apply proper validation checks (e.g., `!isNaN`, `value >= 0`) before using data retrieved from `localStorage`.

## 2024-05-24 - Cryptographically Secure Randomness in Game Mechanics
**Vulnerability:** Weak random number generation (`Math.random()`) used for core game mechanics (spawns, drops, firing), allowing potential predictability/manipulation.
**Learning:** `Math.random()` is not cryptographically secure. While direct replacement with `window.crypto.getRandomValues()` causes performance regressions in high-frequency game loops, a buffered approach (`Uint32Array` populated in chunks) provides secure randomness with minimal overhead.
**Prevention:** Use a buffered `window.crypto.getRandomValues()` wrapper (e.g., `getSecureRandom()`) for sensitive game mechanics, while retaining `Math.random()` for purely visual effects (particles) where security is not a concern.
