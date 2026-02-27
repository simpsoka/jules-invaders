## 2024-05-24 - [Avoid Array.prototype.flat() in Game Loops]
**Learning:** `Array.prototype.flat()` creates a new array on every call, causing significant garbage collection overhead and O(N) allocation costs in hot paths like the `update` loop.
**Action:** Store game entities (like aliens) in a flat 1D array from the start, or maintain a flattened cache if 2D structure is needed for initialization.
