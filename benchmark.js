const { performance } = require('perf_hooks');

// Setup mock state
let animationFrame = 0;
const squidStormActive = true;
const colors = { projectile: '#FFFFFF' };
const playerProjectiles = [];
for (let i = 0; i < 100; i++) {
  playerProjectiles.push({ status: 1, x: 10, y: 10, width: 5, height: 10 });
}

const alienProjectiles = [];
for (let i = 0; i < 100; i++) {
  alienProjectiles.push({ status: 1, x: 10, y: 10, width: 5, height: 10 });
}

// Mock ctx
const ctx = {
  fillStyle: '',
  fillRect: (x, y, w, h) => {}
};

function runUnoptimized() {
  const start = performance.now();
  for (let iter = 0; iter < 10000; iter++) {
    animationFrame++;
    playerProjectiles.forEach((p) => {
      if (p.status === 1) {
        if (squidStormActive) {
          ctx.fillStyle = `hsl(${animationFrame % 360}, 100%, 50%)`;
        } else {
          ctx.fillStyle = colors.projectile;
        }
        ctx.fillRect(p.x, p.y, p.width, p.height);
      }
    });
    alienProjectiles.forEach((p) => {
      if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });
  }
  return performance.now() - start;
}

function runOptimized() {
  const start = performance.now();
  for (let iter = 0; iter < 10000; iter++) {
    animationFrame++;
    // Optimized code
    const playerProjColor = squidStormActive ? `hsl(${animationFrame % 360}, 100%, 50%)` : colors.projectile;
    playerProjectiles.forEach((p) => {
      if (p.status === 1) {
        ctx.fillStyle = playerProjColor;
        ctx.fillRect(p.x, p.y, p.width, p.height);
      }
    });
    alienProjectiles.forEach((p) => {
      if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });
  }
  return performance.now() - start;
}

const unopt = runUnoptimized();
const opt = runOptimized();

console.log(`Unoptimized: ${unopt.toFixed(2)}ms`);
console.log(`Optimized: ${opt.toFixed(2)}ms`);
console.log(`Improvement: ${((unopt - opt) / unopt * 100).toFixed(2)}%`);
