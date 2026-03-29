// let's make sure the checkBunkerCollision function works logically
const PIXEL_SIZE = 4;
const bunkerWidth = 44;
const bunkerHeight = 32;

const bunkers = [];
for (let i = 0; i < 3; i++) {
  bunkers.push({
    x: 100 + i * 200,
    y: 500,
    grid: Array(4).fill(0).map(() => Array(7).fill(1))
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
        bunker.grid[gridY][gridX] = 0; // Destroy block
        p.status = 0; // Deactivate projectile
        break; // A projectile can only hit one block, so break out of bunkers loop
      }
    }
  }
}
console.log(bunkers[0].grid[0][0]);
const p = {x: 101, y: 501, status: 1};
checkBunkerCollision(p);
console.log(bunkers[0].grid[0][0]);
console.log(p.status);
