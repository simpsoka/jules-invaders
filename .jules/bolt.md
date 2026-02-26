## 2024-05-22 - [Array Removal Anti-Pattern]
**Learning:** Using `forEach` with `splice` to remove elements from an array is buggy because it skips the next element after a removal (index shifts). It's also O(N) for removal, making the loop O(N^2) in the worst case. Using `filter` creates a new array allocation every frame, increasing GC pressure.
**Action:** Use a `while` loop with a "swap-and-pop" strategy (replace current element with the last one, then pop) for O(1) removal and correct iteration without allocation.
