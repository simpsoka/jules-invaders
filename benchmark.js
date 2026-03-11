const { performance } = require('perf_hooks');

const PIXEL_SIZE = 4;
const bunkerWidth = 28;
const bunkerHeight = 16;
const bunkers = [{x: 100, y: 500, grid: [[1,1],[1,1]]}];
const playerProjectiles = Array(5).fill({status: 1, x: 110, y: 500});
const alienProjectiles = Array(5).fill({status: 1, x: 120, y: 500});

function runOriginal() {
  const allProjectiles = [...playerProjectiles, ...alienProjectiles];
  allProjectiles.forEach((p) => {
    if (p.status === 1) {
      bunkers.forEach((bunker) => {
        const blockWidth = PIXEL_SIZE * 2;
        const blockHeight = PIXEL_SIZE * 2;
        if (
          p.x > bunker.x &&
          p.x < bunker.x + bunkerWidth &&
          p.y > bunker.y &&
          p.y < bunker.y + bunkerHeight
        ) {
          const gridX = Math.floor((p.x - bunker.x) / blockWidth);
          const gridY = Math.floor((p.y - bunker.y) / blockHeight);
          // Dummy logic for benchmark
        }
      });
    }
  });
}

function runOptimized() {
  for (let arrIdx = 0; arrIdx < 2; arrIdx++) {
    const projectiles = arrIdx === 0 ? playerProjectiles : alienProjectiles;
    for (let i = 0; i < projectiles.length; i++) {
      const p = projectiles[i];
      if (p.status === 1) {
        for (let b = 0; b < bunkers.length; b++) {
          const bunker = bunkers[b];
          const blockWidth = PIXEL_SIZE * 2;
          const blockHeight = PIXEL_SIZE * 2;
          if (
            p.x > bunker.x &&
            p.x < bunker.x + bunkerWidth &&
            p.y > bunker.y &&
            p.y < bunker.y + bunkerHeight
          ) {
            const gridX = Math.floor((p.x - bunker.x) / blockWidth);
            const gridY = Math.floor((p.y - bunker.y) / blockHeight);
            // Dummy logic
          }
        }
      }
    }
  }
}

const ITERATIONS = 100000;

let startOriginal = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runOriginal();
}
let endOriginal = performance.now();

let startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runOptimized();
}
let endOptimized = performance.now();

console.log(`Original: ${endOriginal - startOriginal} ms`);
console.log(`Optimized: ${endOptimized - startOptimized} ms`);
