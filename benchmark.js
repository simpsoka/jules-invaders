const { performance } = require('perf_hooks');

const PIXEL_SIZE = 2;
const bunkerWidth = 44 * 2;
const bunkerHeight = 32 * 2;
const blockWidth = PIXEL_SIZE * 2;
const blockHeight = PIXEL_SIZE * 2;

// Mock state
const bunkers = [];
for (let i = 0; i < 4; i++) {
  const grid = [];
  for (let r = 0; r < 16; r++) {
    grid[r] = new Array(22).fill(1);
  }
  bunkers.push({ x: i * 200, y: 500, grid });
}

const playerProjectiles = [];
for (let i = 0; i < 10; i++) {
  playerProjectiles.push({ x: Math.random() * 800, y: 500 + Math.random() * 20, status: 1 });
}

const alienProjectiles = [];
for (let i = 0; i < 20; i++) {
  alienProjectiles.push({ x: Math.random() * 800, y: 500 + Math.random() * 20, status: 1 });
}

function original() {
  const allProjectiles = [...playerProjectiles, ...alienProjectiles];
  allProjectiles.forEach((p) => {
    if (p.status === 1) {
      bunkers.forEach((bunker) => {
        if (
          p.x > bunker.x &&
          p.x < bunker.x + bunkerWidth &&
          p.y > bunker.y &&
          p.y < bunker.y + bunkerHeight
        ) {
          const gridX = Math.floor((p.x - bunker.x) / blockWidth);
          const gridY = Math.floor((p.y - bunker.y) / blockHeight);
          if (bunker.grid[gridY] && bunker.grid[gridY][gridX] === 1) {
            bunker.grid[gridY][gridX] = 0;
            p.status = 0;
          }
        }
      });
    }
  });
}

function checkBunkerCollision(p) {
  if (p.status !== 1) return;
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
        bunker.grid[gridY][gridX] = 0;
        p.status = 0;
        return;
      }
    }
  }
}

function optimized() {
  for (let i = 0; i < playerProjectiles.length; i++) {
    checkBunkerCollision(playerProjectiles[i]);
  }
  for (let i = 0; i < alienProjectiles.length; i++) {
    checkBunkerCollision(alienProjectiles[i]);
  }
}

function restore() {
  [...playerProjectiles, ...alienProjectiles].forEach(p => p.status = 1);
  bunkers.forEach(b => {
    for (let r = 0; r < 16; r++) b.grid[r].fill(1);
  });
}

const iterations = 100000;

restore();
const start1 = performance.now();
for (let i = 0; i < iterations; i++) {
  original();
  if (i % 100 === 0) restore();
}
const end1 = performance.now();

restore();
const start2 = performance.now();
for (let i = 0; i < iterations; i++) {
  optimized();
  if (i % 100 === 0) restore();
}
const end2 = performance.now();

console.log(`Original: ${(end1 - start1).toFixed(2)} ms`);
console.log(`Optimized: ${(end2 - start2).toFixed(2)} ms`);
console.log(`Speedup: ${((end1 - start1) / (end2 - start2)).toFixed(2)}x`);
