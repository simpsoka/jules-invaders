const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playAgainBtn = document.getElementById('playAgainBtn');

// --- Sprite & Asset Definitions ---
const PIXEL_SIZE = 4;

const PLAYER_SPRITE_A = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0]
];

const PLAYER_SPRITE_B = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0]
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

const SQUID_SPRITE = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 1],
];


// --- Color Management ---
// Note: The `colors` constant was previously declared twice.
// The first declaration, which was a simplified version, has been removed
// to resolve a syntax error that prevented the game from running.
/**
 * Converts an HSL color value to HEX.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {string}          The HEX representation
 */
function hslToHex(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function updateColorsForLevel(level) {
    const hueShift = ((level - 1) * 10); // 10 degrees hue shift per level

    // Base HSL values, with hue in degrees
    const baseUfoHsl = { h: 300, s: 0.76, l: 0.72 };
    const baseSquidHsl = { h: 260, s: 0.60, l: 0.71 };
    const baseAlienHsl = { h: 84, s: 1.00, l: 0.59 };
    const baseExplosionHsl = { h: 300, s: 1.00, l: 0.50 };

    colors.ufo = hslToHex(((baseUfoHsl.h + hueShift) % 360) / 360, baseUfoHsl.s, baseUfoHsl.l);
    colors.squid = hslToHex(((baseSquidHsl.h + hueShift) % 360) / 360, baseSquidHsl.s, baseSquidHsl.l);
    colors.alien = hslToHex(((baseAlienHsl.h + hueShift) % 360) / 360, baseAlienHsl.s, baseAlienHsl.l);
    colors.bunker = colors.alien; // Bunkers match aliens
    colors.ground = colors.alien; // Ground matches aliens
    colors.squidExplosion = hslToHex(((baseExplosionHsl.h + hueShift) % 360) / 360, baseExplosionHsl.s, baseExplosionHsl.l);
}


// --- Game variables ---
const colors = {
    player: { 1: '#708090', 2: '#FFD700' },
    ufo: '#EE82EE',
    squid: '#9370DB',
    alien: '#ADFF2F',
    bunker: '#ADFF2F',
    projectile: '#FFF',
    ground: '#ADFF2F',
    text: '#FFF',
    explosion: 'magenta'
};
let score = 0;
let highScore = 0;
let level = 1;
let gameOver = false;
let gameWon = false;
let animationFrame = 0;
let alienDirection = 1;
let alienSpeed = 0.5;
let alienFireRate = 0.0005;
let gameConfig = { isDemo: false };

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
  x: canvas.width / 2 - (PLAYER_SPRITE_A[0].length * PIXEL_SIZE) / 2,
  y: canvas.height - (PLAYER_SPRITE_A.length * PIXEL_SIZE) - 20,
  width: PLAYER_SPRITE_A[0].length * PIXEL_SIZE,
  height: PLAYER_SPRITE_A.length * PIXEL_SIZE,
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
    const isSquid = Math.random() < 1 / 15;
    aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType, isSquid: isSquid };
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
let explosions = [];

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

  // Reset colors to default
  colors.player = { 1: '#708090', 2: '#FFD700' };
  colors.ufo = '#EE82EE';
  colors.squid = '#9370DB';
  colors.alien = '#ADFF2F';
  colors.bunker = '#ADFF2F';
  colors.projectile = '#FFF';
  colors.ground = '#ADFF2F';
  colors.text = '#FFF';
  colors.explosion = 'magenta';
  canvas.style.borderColor = '#FFFFFF';

  alienSpeed = 0.5;
  alienFireRate = 0.0005;
  gameOver = false;
  gameWon = false;
  alienDirection = 1;

  player.x = canvas.width / 2 - (PLAYER_SPRITE_A[0].length * PIXEL_SIZE) / 2;
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
      const isSquid = Math.random() < 1 / 15;
      aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType, isSquid: isSquid };
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
  explosions.length = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;

  playAgainBtn.style.display = 'none';
}

function resetAliensForNextLevel() {
  updateColorsForLevel(level);
  alienSpeed = 0.5 * Math.pow(1.5, level - 1);
  alienFireRate = 0.0005 + (level - 1) * 0.0005;

  // Update colors for the new level
  colors.ufo = shiftColor('#EE82EE', level);
  colors.squid = shiftColor('#9370DB', level);
  colors.alien = shiftColor('#ADFF2F', level);
  colors.bunker = shiftColor('#ADFF2F', level);
  colors.ground = shiftColor('#ADFF2F', level);
  canvas.style.borderColor = shiftColor('#FFFFFF', level);


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
      const isSquid = Math.random() < 1 / 15;
      aliens[c][r] = { x: alienX, y: alienY, status: 1, type: alienType, isSquid: isSquid };
    }
  }
  playerProjectiles.length = 0;
  alienProjectiles.length = 0;
  explosions.length = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;
}


// --- Game Functions ---
function shiftColor(hex, level) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    // Convert RGB to HSL
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Apply level-based shift
    h = (h + (level - 1) * 0.03) % 1; // Hue shift
    l = Math.max(0.1, Math.min(0.9, l - (level - 1) * 0.01)); // Lightness shift

    // Convert HSL to RGB
    let r2, g2, b2;
    if (s === 0) {
        r2 = g2 = b2 = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r2 = hue2rgb(p, q, h + 1/3);
        g2 = hue2rgb(p, q, h);
        b2 = hue2rgb(p, q, h - 1/3);
    }

    // Convert RGB to hex
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}

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
    if (gameOver && !gameConfig.isDemo) return;

    animationFrame++;

    if (!gameConfig.isDemo) {
        // Horizontal movement
        let dx = 0;
        if (keys.ArrowLeft && !keys.ArrowRight) {
            dx = -player.speed;
        } else if (keys.ArrowRight && !keys.ArrowLeft) {
            dx = player.speed;
        }
        player.dx = dx;

        // Shooting logic
        const currentTime = Date.now();
        if (keys[' '] && currentTime - player.lastShotTime > player.shootCooldown) {
            fireProjectile();
            player.lastShotTime = currentTime;
        }

        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    }

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
                    if (alien.isSquid) {
                        score += 50;
                explosions.push({ x: alien.x, y: alien.y, color: colors.squidExplosion, size: 30, timer: 10 });
                        explosions.push({ x: alien.x, y: alien.y, color: colors.explosion, size: 30, timer: 10 });
                    } else {
                        score += 10;
                    }
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

    // Draw explosions
    explosions.forEach(explosion => {
        ctx.fillStyle = explosion.color;
        ctx.beginPath();
        ctx.arc(explosion.x + alienWidth / 2, explosion.y + alienHeight / 2, explosion.size * (explosion.timer / 10), 0, Math.PI * 2);
        ctx.fill();
    });


    // Alien projectiles vs Player
    if (!gameConfig.isDemo) {
        alienProjectiles.forEach(p => {
            if (p.status === 1 && p.x > player.x && p.x < player.x + player.width && p.y > player.y && p.y < player.y + player.height) {
                p.status = 0;
                gameOver = true;
            }
        });
    }

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

    if (gameOver && !gameConfig.isDemo) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('spaceInvadersHighScore', highScore);
        }
    }

    // Filter out inactive projectiles
    playerProjectiles = playerProjectiles.filter(p => p.status === 1);
    alienProjectiles = alienProjectiles.filter(p => p.status === 1);

    // Update explosions
    explosions.forEach((explosion, index) => {
        explosion.timer--;
        if (explosion.timer <= 0) {
            explosions.splice(index, 1);
        }
    });
}

// --- Drawing Functions ---
function drawPixelArt(sprite, x, y, color, pixelSize) {
    for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
            const pixel = sprite[r][c];
            if (pixel !== 0) {
                if (typeof color === 'object') {
                    ctx.fillStyle = color[pixel];
                } else {
                    ctx.fillStyle = color;
                }
                ctx.fillRect(x + c * pixelSize, y + r * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Darken background based on level
    const backgroundDarkness = Math.min(0.5, (level - 1) * 0.05);
    ctx.fillStyle = `rgba(0, 0, 0, ${backgroundDarkness})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const playerColorMap = {
        1: '#708090', // Dark Steel
        2: '#FFD700'  // Gold
    };
    const playerSprite = Math.floor(animationFrame / 30) % 2 === 0 ? PLAYER_SPRITE_A : PLAYER_SPRITE_B;
    drawPixelArt(playerSprite, player.x, player.y, colors.player, PIXEL_SIZE);

    if (ufo.status === 1) {
        drawPixelArt(UFO_SPRITE, ufo.x, ufo.y, colors.ufo, PIXEL_SIZE);
    }


    aliens.flat().forEach(alien => {
        if (alien.status === 1) {
            if (alien.isSquid) {
                drawPixelArt(SQUID_SPRITE, alien.x, alien.y, colors.squid, PIXEL_SIZE);
            } else {
                let sprite;
                const isDancing = Math.floor(animationFrame / 30) % 2 === 0;
                if (alien.type === 1) {
                    sprite = isDancing ? ALIEN_SPRITE_1_DANCE : ALIEN_SPRITE_1;
                } else if (alien.type === 2) {
                    sprite = isDancing ? ALIEN_SPRITE_2_DANCE : ALIEN_SPRITE_2;
                } else {
                    sprite = isDancing ? ALIEN_SPRITE_3_DANCE : ALIEN_SPRITE_3;
                }
                drawPixelArt(sprite, alien.x, alien.y, colors.alien, PIXEL_SIZE);
            }
        }
    });

    bunkers.forEach(bunker => {
        ctx.fillStyle = colors.bunker;
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


    ctx.fillStyle = colors.projectile;
    playerProjectiles.forEach(p => {
        if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });
    alienProjectiles.forEach(p => {
        if (p.status === 1) ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    // Draw Ground Line
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, canvas.height - 10, canvas.width, 5);


    ctx.fillStyle = colors.text;
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText('Score: ' + score, 10, 25);
    ctx.textAlign = 'center';
    ctx.fillText('Level: ' + level, canvas.width / 2, 25);
    ctx.textAlign = 'right';
    ctx.fillText('High Score: ' + highScore, canvas.width - 10, 25);
    ctx.textAlign = 'left';

    if (gameOver && !gameConfig.isDemo) {
        ctx.fillStyle = colors.text;
        ctx.font = '50px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(gameWon ? 'YOU WIN!' : 'GAME OVER', canvas.width / 2, canvas.height / 2);
        if (playAgainBtn) playAgainBtn.style.display = 'block';
    } else {
        if (playAgainBtn) playAgainBtn.style.display = 'none';
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

function initGame(config) {
    gameConfig = config;
    loadHighScore();
    updateColorsForLevel(level);
    gameLoop();
}