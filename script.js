const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playAgainBtn = document.getElementById('playAgainBtn');

// --- Sprite & Asset Definitions ---
const PIXEL_SIZE = 4;

const PLAYER_SPRITE = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const ALIEN_SPRITE_1 = [
  [0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1],
];

const ALIEN_SPRITE_2 = [
  [0, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 0],
];

const ALIEN_SPRITE_3 = [
  [0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1],
];

const ALIEN_SPRITE_1_DANCE = [
  [0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 0],
];

const ALIEN_SPRITE_2_DANCE = [
  [0, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 1],
];

const ALIEN_SPRITE_3_DANCE = [
  [0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0],
];

const BUNKER_SPRITE = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
];

const UFO_SPRITE = [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1, 0]
];


// --- Game variables ---
let score = 0;
let highScore = 0;
let level = 1;
let gameOver = false;
let gameWon = false;
let animationFrame = 0;
let alienDirection = 1;
let alienSpeed = 0.5;
let alienFireRate = 0.0005;

const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ' ': false,
};

// Sound effects
const shootSound = new Audio('assets/shoot.wav');
const explosionSound = new Audio('assets/explosion.wav');

// Player
const player = {
  x: canvas.width / 2 - (PLAYER_SPRITE[0].length * PIXEL_SIZE) / 2,
  y: canvas.height - (PLAYER_SPRITE.length * PIXEL_SIZE) - 20,
  width: PLAYER_SPRITE[0].length * PIXEL_SIZE,
  height: PLAYER_SPRITE.length * PIXEL_SIZE,
  speed: 5,
  dx: 0,
  shootCooldown: 100, // Milliseconds
  lastShotTime: 0,
};

// UFO
const ufo = {
    x: -UFO_SPRITE[0].length * PIXEL_SIZE,
    y: 20,
    width: UFO_SPRITE[0].length * PIXEL_SIZE,
    height: UFO_SPRITE.length * PIXEL_SIZE,
    speed: 2,
    status: 0 // 0 = inactive, 1 = active
};


// Aliens
const alienRowCount = 5;
const alienColumnCount = 11;
const alienWidth = ALIEN_SPRITE_2[0].length * PIXEL_SIZE;
const alienHeight = ALIEN_SPRITE_2.length * PIXEL_SIZE;
const alienPadding = 15;
const alienOffsetTop = 50;
const alienOffsetLeft = 30;

const aliens = [];
for (let c = 0; c < alienColumnCount; c++) {
  aliens[c] = [];
  for (let r = 0; r < alienRowCount; r++) {
    const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
    const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
    let alienType;
    if (r === 0) alienType = 1;
    else if (r < 3) alienType = 2;
    else alienType = 3;
    aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType };
  }
}

// Bunkers
const bunkerCount = 3;
const bunkerWidth = BUNKER_SPRITE[0].length * PIXEL_SIZE * 2;
const bunkerHeight = BUNKER_SPRITE.length * PIXEL_SIZE * 2;
const bunkerPadding = (canvas.width - (bunkerCount * bunkerWidth)) / (bunkerCount + 1);
const bunkers = [];
for (let i = 0; i < bunkerCount; i++) {
    bunkers.push({
        x: bunkerPadding + i * (bunkerWidth + bunkerPadding),
        y: player.y - bunkerHeight - 30,
        grid: BUNKER_SPRITE.map(row => row.slice()) // Create a copy
    });
}


// Projectiles
let playerProjectiles = [];
let alienProjectiles = [];

// --- Event listeners & Key handlers ---
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'Left') {
    keys.ArrowLeft = true;
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    keys.ArrowRight = true;
  } else if (e.key === ' ' || e.key === 'Spacebar') {
    keys[' '] = true;
  }
}

function keyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'Left') {
    keys.ArrowLeft = false;
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    keys.ArrowRight = false;
  } else if (e.key === ' ' || e.key === 'Spacebar') {
    keys[' '] = false;
  }
}

// --- Reset Game ---
playAgainBtn.addEventListener('click', resetGame);

function resetGame() {
  score = 0;
  level = 1;
  alienSpeed = 0.5;
  alienFireRate = 0.0005;
  gameOver = false;
  gameWon = false;
  alienDirection = 1;

  player.x = canvas.width / 2 - (PLAYER_SPRITE[0].length * PIXEL_SIZE) / 2;
  player.dx = 0;

  aliens.length = 0;
  for (let c = 0; c < alienColumnCount; c++) {
    aliens[c] = [];
    for (let r = 0; r < alienRowCount; r++) {
      const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
      const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
      let alienType;
      if (r === 0) alienType = 1;
      else if (r < 3) alienType = 2;
      else alienType = 3;
      aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType };
    }
  }

  bunkers.length = 0;
  for (let i = 0; i < bunkerCount; i++) {
    bunkers.push({
      x: bunkerPadding + i * (bunkerWidth + bunkerPadding),
      y: player.y - bunkerHeight - 30,
      grid: BUNKER_SPRITE.map(row => row.slice())
    });
  }

  playerProjectiles.length = 0;
  alienProjectiles.length = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;

  playAgainBtn.style.display = 'none';
}

function resetAliensForNextLevel() {
  alienSpeed = 0.5 * Math.pow(1.2, level - 1);
  alienFireRate = 0.0005 + (level - 1) * 0.0002;
  aliens.length = 0;
  for (let c = 0; c < alienColumnCount; c++) {
    aliens[c] = [];
    for (let r = 0; r < alienRowCount; r++) {
      const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
      const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
      let alienType;
      if (r === 0) alienType = 1;
      else if (r < 3) alienType = 2;
      else alienType = 3;
      aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType };
    }
  }
  playerProjectiles.length = 0;
  alienProjectiles.length = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;
}


// --- Game Functions ---
function fireProjectile() {
    const p = {
        x: player.x + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 10,
        speed: 10,
        status: 1
    };
    playerProjectiles.push(p);
    shootSound.play();
}

function fireAlienProjectile(alien) {
    const p = {
        x: alien.x + alienWidth / 2 - 2.5,
        y: alien.y + alienHeight,
        width: 5,
        height: 10,
        speed: 5,
        status: 1
    };
    alienProjectiles.push(p);
}

// --- Main Game Loop ---
function update() {
    if (gameOver) return;

    animationFrame++;

    if (keys.ArrowLeft) {
        player.dx = -player.speed;
    } else if (keys.ArrowRight) {
        player.dx = player.speed;
    } else {
        player.dx = 0;
    }

    // Shooting logic
    const currentTime = Date.now();
    if (keys[' '] && currentTime - player.lastShotTime > player.shootCooldown) {
        fireProjectile();
        player.lastShotTime = currentTime;
    }

    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    playerProjectiles.forEach(p => {
        if (p.status === 1) {
            p.y -= p.speed;
            if (p.y < 0) p.status = 0;
        }
    });

    alienProjectiles.forEach(p => {
        if (p.status === 1) {
            p.y += p.speed;
            if (p.y > canvas.height) p.status = 0;
        }
    });

    // UFO Logic
    if (ufo.status === 0 && Math.random() < 0.0005) {
        ufo.status = 1;
        ufo.x = -ufo.width;
    }

    if (ufo.status === 1) {
        ufo.x += ufo.speed;
        if (ufo.x > canvas.width) {
            ufo.status = 0;
        }
    }


    let changeDirection = false;
    aliens.flat().forEach(alien => {
        if (alien.status === 1) {
            alien.x += alienSpeed * alienDirection;
            if (alien.x + alienWidth > canvas.width || alien.x < 0) changeDirection = true;
            if (alien.y + alienHeight >= player.y) gameOver = true;
            if (Math.random() < alienFireRate) fireAlienProjectile(alien);
        }
    });

    if (changeDirection) {
        alienDirection *= -1;
        alienSpeed *= 1.15;
        aliens.flat().forEach(alien => alien.y += alienHeight / 2);
    }

    // --- Collision Detection ---
    playerProjectiles.forEach(p => {
        if (p.status === 1) {
            // Player projectile vs Aliens
            aliens.flat().forEach(alien => {
                if (alien.status === 1 && p.x > alien.x && p.x < alien.x + alienWidth && p.y > alien.y && p.y < alien.y + alienHeight) {
                    alien.status = 0;
                    p.status = 0;
                    score += 10;
                    explosionSound.play();
                }
            });

            // Player projectile vs UFO
            if (ufo.status === 1 && p.x > ufo.x && p.x < ufo.x + ufo.width && p.y > ufo.y && p.y < ufo.y + ufo.height) {
                ufo.status = 0;
                p.status = 0;
                score += 100;
                explosionSound.play();
            }
        }
    });


    // Alien projectiles vs Player
    alienProjectiles.forEach(p => {
        if (p.status === 1 && p.x > player.x && p.x < player.x + player.width && p.y > player.y && p.y < player.y + player.height) {
            p.status = 0;
            gameOver = true;
        }
    });

    // Projectiles vs Bunkers
    const allProjectiles = [...playerProjectiles, ...alienProjectiles];
    allProjectiles.forEach(p => {
        if (p.status === 1) {
            bunkers.forEach(bunker => {
                const blockWidth = PIXEL_SIZE * 2;
                const blockHeight = PIXEL_SIZE * 2;
                if (p.x > bunker.x && p.x < bunker.x + bunkerWidth && p.y > bunker.y && p.y < bunker.y + bunkerHeight) {
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


    if (aliens.flat().filter(a => a.status === 1).length <= 10) {
        level++;
        resetAliensForNextLevel();
    }

    if (gameOver) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('spaceInvadersHighScore', highScore);
        }
    }

    // Filter out inactive projectiles
    playerProjectiles = playerProjectiles.filter(p => p.status === 1);
    alienProjectiles = alienProjectiles.filter(p => p.status === 1);
}

// --- Drawing Functions ---
function drawPixelArt(sprite, x, y, color, pixelSize) {
    ctx.fillStyle = color;
    for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
            if (sprite[r][c] === 1) {
                ctx.fillRect(x + c * pixelSize, y + r * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPixelArt(PLAYER_SPRITE, player.x, player.y, '#D2691E', PIXEL_SIZE);

    if (ufo.status === 1) {
        drawPixelArt(UFO_SPRITE, ufo.x, ufo.y, '#EE82EE', PIXEL_SIZE);
    }


    aliens.flat().forEach(alien => {
        if (alien.status === 1) {
            let sprite;
            const isDancing = Math.floor(animationFrame / 30) % 2 === 0;
            if (alien.type === 1) {
                sprite = isDancing ? ALIEN_SPRITE_1_DANCE : ALIEN_SPRITE_1;
            } else if (alien.type === 2) {
                sprite = isDancing ? ALIEN_SPRITE_2_DANCE : ALIEN_SPRITE_2;
            } else {
                sprite = isDancing ? ALIEN_SPRITE_3_DANCE : ALIEN_SPRITE_3;
            }
            drawPixelArt(sprite, alien.x, alien.y, '#ADFF2F', PIXEL_SIZE);
        }
    });

    bunkers.forEach(bunker => {
        ctx.fillStyle = '#ADFF2F';
        const blockWidth = PIXEL_SIZE * 2;
        const blockHeight = PIXEL_SIZE * 2;
        for(let r = 0; r < bunker.grid.length; r++) {
            for(let c = 0; c < bunker.grid[r].length; c++) {
                if(bunker.grid[r][c] === 1) {
                    ctx.fillRect(bunker.x + c * blockWidth, bunker.y + r * blockHeight, blockWidth, blockHeight);
                }
            }
        }
    });


    ctx.fillStyle = '#FFF';
    playerProjectiles.forEach(p => {
        if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });
    alienProjectiles.forEach(p => {
        if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    // Draw Ground Line
    ctx.fillStyle = '#ADFF2F';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 5);


    ctx.fillStyle = '#fff';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText('Score: ' + score, 10, 25);
    ctx.textAlign = 'center';
    ctx.fillText('Level: ' + level, canvas.width / 2, 25);
    ctx.textAlign = 'right';
    ctx.fillText('High Score: ' + highScore, canvas.width - 10, 25);
    ctx.textAlign = 'left';

    if (gameOver) {
        ctx.font = '50px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(gameWon ? 'YOU WIN!' : 'GAME OVER', canvas.width / 2, canvas.height / 2);
        playAgainBtn.style.display = 'block';
    } else {
        playAgainBtn.style.display = 'none';
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function loadHighScore() {
    const storedHighScore = localStorage.getItem('spaceInvadersHighScore');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore);
    }
}

loadHighScore();
gameLoop();