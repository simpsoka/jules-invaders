## 2024-05-18 - [Optimize Array Cleanup with Swap-and-Pop]

**Learning:** In the game's main `update()` loop, removing inactive elements (like particles, explosions, projectiles) was initially done using `Array.prototype.filter()` or `.forEach()` paired with `.splice()`. The `.splice()` operation inside `.forEach()` is a major anti-pattern as it does not adjust the iteration index resulting in skipped elements. Furthermore, both `.filter()` and `.splice()` incur O(N) penalties (memory allocation for `.filter()`, and element shifting for `.splice()`). Since the draw order for these arrays does not matter, a `while` loop combined with the "swap-and-pop" strategy (swapping the element to remove with the last element and calling `.pop()`) drops array removal overhead to O(1) in-place without producing skipped elements.
**Action:** Replaced usage of `.filter()` and `.splice()` in the main frame loop with the swap-and-pop technique for arrays where element ordering is non-critical. Will proactively use this technique in other high-frequency update loops requiring element removals.

## 2024-05-18 - [Optimize High-Frequency Loops by Removing Array.flat()]

**Learning:** In the game's `update()` loop, `aliens.flat().forEach(...)` and `aliens.flat().filter(...)` were used multiple times per frame. Calling `.flat()` creates a new array every time, resulting in significant garbage collection pressure and CPU overhead (O(N) operations) during a high-frequency (60fps) update loop.
**Action:** Replaced instances of `aliens.flat()` with nested `for` loops iterating over columns and rows. Always prefer zero-allocation iteration methods (like nested `for` loops or index tracking) over methods that allocate new arrays (like `.flat()`, `.filter()`, or `.map()`) in critical rendering paths.

## 2024-05-18 - [Optimize High-Frequency Loops by Removing Spread Syntax and forEach]

**Learning:** In the game's `update()` loop, `[...playerProjectiles, ...alienProjectiles].forEach(...)` was used to process collisions against bunkers. This created a new array using the spread operator and relied on a closure-based `forEach` loop on every single frame. This results in significant memory allocation, garbage collection pressure, and CPU overhead (closure execution). O(N) allocation happens each frame.
**Action:** Replaced instances of spread syntax array creation and `.forEach()` loops with standard `for` loops without allocating a combined array in high-frequency update paths. Also hoisted block dimension constant calculations outside the loops.
