const { performance } = require('perf_hooks');

const PIXEL_SIZE = 4;
const bunkerWidth = 7 * PIXEL_SIZE * 2;
const bunkerHeight = 4 * PIXEL_SIZE * 2;

function createGameState() {
  const bunkers = [
    { x: 100, y: 400, grid: [[1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1]] },
    { x: 300, y: 400, grid: [[1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1]] },
    { x: 500, y: 400, grid: [[1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1]] }
  ];

  const playerProjectiles = [];
  for (let i = 0; i < 5; i++) {
    playerProjectiles.push({ x: 120 + i * 10, y: 410, status: 1 });
  }

  const alienProjectiles = [];
  for (let i = 0; i < 15; i++) {
    alienProjectiles.push({ x: 320 + i * 5, y: 420, status: 1 });
  }

  return { bunkers, playerProjectiles, alienProjectiles };
}

function originalLogic(bunkers, playerProjectiles, alienProjectiles) {
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
            bunker.grid[gridY][gridX] = 0; // Destroy block
            p.status = 0; // Deactivate projectile
          }
        }
      });
    }
  });
}

function checkProjectilesAgainstBunkers(projectiles, bunkers) {
  const blockWidth = PIXEL_SIZE * 2;
  const blockHeight = PIXEL_SIZE * 2;
  for (let i = 0; i < projectiles.length; i++) {
    const p = projectiles[i];
    if (p.status === 1) {
      for (let j = 0; j < bunkers.length; j++) {
        const bunker = bunkers[j];
        if (
          p.x > bunker.x &&
          p.x < bunker.x + bunkerWidth &&
          p.y > bunker.y &&
          p.y < bunker.y + bunkerHeight
        ) {
          const gridX = Math.floor((p.x - bunker.x) / blockWidth);
          const gridY = Math.floor((p.y - bunker.y) / blockHeight);
          if (bunker.grid[gridY] && bunker.grid[gridY][gridX] === 1) {
            bunker.grid[gridY][gridX] = 0; // Destroy block
            p.status = 0; // Deactivate projectile
            break; // Early exit: projectile is destroyed
          }
        }
      }
    }
  }
}

function newLogic(bunkers, playerProjectiles, alienProjectiles) {
  checkProjectilesAgainstBunkers(playerProjectiles, bunkers);
  checkProjectilesAgainstBunkers(alienProjectiles, bunkers);
}

function runBenchmark() {
  const iterations = 100000;

  // Warmup
  for (let i = 0; i < 1000; i++) {
    const state1 = createGameState();
    originalLogic(state1.bunkers, state1.playerProjectiles, state1.alienProjectiles);
    const state2 = createGameState();
    newLogic(state2.bunkers, state2.playerProjectiles, state2.alienProjectiles);
  }

  let totalOriginal = 0;
  for (let i = 0; i < iterations; i++) {
    const state = createGameState();
    const start = performance.now();
    originalLogic(state.bunkers, state.playerProjectiles, state.alienProjectiles);
    totalOriginal += (performance.now() - start);
  }

  let totalNew = 0;
  for (let i = 0; i < iterations; i++) {
    const state = createGameState();
    const start = performance.now();
    newLogic(state.bunkers, state.playerProjectiles, state.alienProjectiles);
    totalNew += (performance.now() - start);
  }

  console.log(`Original Logic: ${totalOriginal.toFixed(2)} ms`);
  console.log(`New Logic: ${totalNew.toFixed(2)} ms`);
  console.log(`Improvement: ${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(2)}%`);
}

runBenchmark();
