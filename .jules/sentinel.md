
## 2024-05-20 - [Security Theater vs. True Security]
**Vulnerability:** Inappropriate application of cryptographic functions (`window.crypto.getRandomValues`) to non-security-critical visual game logic.
**Learning:** Upgrading `Math.random` to secure randomness in rendering loops is "security theater." It offers zero security benefit and severely degrades performance (allocations and CPU overhead) due to frequent calls in game loops.
**Prevention:** Restrict cryptographic random number generation to contexts requiring true entropy (e.g., token generation, session IDs). Use standard `Math.random()` for client-side visuals, chance systems, and non-sensitive logic. Focus defensive programming on actual untrusted data boundaries, such as `localStorage` input validation.
