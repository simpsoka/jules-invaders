const { performance } = require('perf_hooks');

const PIXEL_SIZE = 4;
const bunkerWidth = 44; // From SPRITE calculations
const bunkerHeight = 32;

// Mock arrays
const bunkers = [];
for (let i = 0; i < 3; i++) {
  bunkers.push({
    x: 100 + i * 200,
    y: 500,
    grid: Array(4).fill(0).map(() => Array(7).fill(1))
  });
}

const playerProjectiles = [];
const alienProjectiles = [];

for (let i = 0; i < 50; i++) {
  playerProjectiles.push({ x: 120, y: 510, status: 1 });
  alienProjectiles.push({ x: 130, y: 520, status: 1 });
}

function beforeOptimization() {
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
          if (bunker.grid[gridY] && bunker.grid[gridY][gridX] === 1) {
            // skip mutation
          }
        }
      });
    }
  });
}

function checkBunkerCollision(p) {
  if (p.status !== 1) return;
  const blockWidth = PIXEL_SIZE * 2;
  const blockHeight = PIXEL_SIZE * 2;
  for (let i = 0; i < bunkers.length; i++) {
    const bunker = bunkers[i];
    if (
      p.x > bunker.x &&
      p.x < bunker.x + bunkerWidth &&
      p.y > bunker.y &&
      p.y < bunker.y + bunkerHeight
    ) {
      const gridX = Math.floor((p.x - bunker.x) / blockWidth);
      const gridY = Math.floor((p.y - bunker.y) / blockHeight);
      if (bunker.grid[gridY] && bunker.grid[gridY][gridX] === 1) {
        break; // Early termination on impact
      }
    }
  }
}

function afterOptimization() {
  for (let i = 0; i < playerProjectiles.length; i++) {
    checkBunkerCollision(playerProjectiles[i]);
  }
  for (let i = 0; i < alienProjectiles.length; i++) {
    checkBunkerCollision(alienProjectiles[i]);
  }
}

// Warm up
for (let i = 0; i < 1000; i++) {
  beforeOptimization();
  afterOptimization();
}

const iter = 50000;
let start = performance.now();
for (let i = 0; i < iter; i++) beforeOptimization();
let end = performance.now();
console.log(`Before: ${(end - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < iter; i++) afterOptimization();
end = performance.now();
console.log(`After: ${(end - start).toFixed(2)}ms`);
