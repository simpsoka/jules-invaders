const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playAgainBtn = document.getElementById("playAgainBtn");
const mobileControls = document.getElementById("mobileControls");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const fireBtn = document.getElementById("fireBtn");

// --- Sprite & Asset Definitions ---
const PIXEL_SIZE = 4;

const PLAYER_SPRITE_A = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0],
];

const SQUIDSTORM_SHIP_SPRITE = [
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 3, 1, 3, 0, 0],
  [0, 4, 1, 1, 1, 4, 0],
  [5, 1, 1, 1, 1, 1, 5],
];

const PLAYER_SPRITE_B = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0],
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
  [0, 1, 1, 0, 0, 1, 1, 0],
];

const BENEVOLENT_UFO_SPRITE = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 2, 1, 1, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 0, 1, 0],
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

const JULES_LOGO_SPRITE = [
  [1, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0],
];

// --- Color Management ---
// Note: The `colors` constant was previously declared twice.
// The first declaration, which was a simplified version, has been removed
// to resolve a syntax error that prevented the game from running.
const colors = {
  player: { 1: "#708090", 2: "#00FF00" },
  dev: { 1: "#FF0000", 2: "#FF1493", 3: "#FF69B4", 4: "#FFC0CB", 5: "#FFFFFF" },
  ufo: "#FFD700",
  benevolentUfo: { 1: "#FFD700", 2: "#FFFFFF" },
  squid: "#FFA500",
  alien: "#32CD32",
  bunker: "#006400",
  projectile: "#90EE90",
  ground: "#228B22",
  text: "#90EE90",
  powerup: "#FFD700",
  explosion: "#32CD32",
  squidExplosion: "#FFD700",
};

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
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function updateColorsForLevel(level) {
  const hueShift = (level - 1) * 10; // 10 degrees hue shift per level

  // Base HSL values, with hue in degrees
  const baseUfoHsl = { h: 50, s: 1.0, l: 0.5 };
  const baseSquidHsl = { h: 39, s: 1.0, l: 0.5 };
  const baseAlienHsl = { h: 120, s: 1.0, l: 0.4 };
  const baseExplosionHsl = { h: 120, s: 1.0, l: 0.5 };

  colors.ufo = hslToHex(
    ((baseUfoHsl.h + hueShift) % 360) / 360,
    baseUfoHsl.s,
    baseUfoHsl.l,
  );
  colors.squid = hslToHex(
    ((baseSquidHsl.h + hueShift) % 360) / 360,
    baseSquidHsl.s,
    baseSquidHsl.l,
  );
  colors.alien = hslToHex(
    ((baseAlienHsl.h + hueShift) % 360) / 360,
    baseAlienHsl.s,
    baseAlienHsl.l,
  );
  colors.bunker = colors.alien; // Bunkers match aliens
  colors.ground = colors.alien; // Ground matches aliens
  colors.squidExplosion = hslToHex(
    ((baseExplosionHsl.h + hueShift) % 360) / 360,
    baseExplosionHsl.s,
    baseExplosionHsl.l,
  );
}

// --- Game variables ---
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let userInputSequence = [];
let squidStormActive = false;
let squidStormMessageTimer = 0;
let squidSquadActive = false;
let squidSquadTimer = 0;

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
  " ": false,
};

// Sound effects
function loadAudio(src) {
  try {
    const sound = new Audio(src);
    return sound;
  } catch (e) {
    console.warn(`Could not load audio: ${src}`);
    return { play: () => {} }; // Return a dummy object with a no-op play method
  }
}

const shootSound = loadAudio("assets/shoot.wav");
const explosionSound = loadAudio("assets/explosion.wav");
const squidStormSound = loadAudio("assets/squidstorm.wav");
const benevolentHitSound = loadAudio("assets/benevolent-hit.wav");

// Player
const player = {
  x: canvas.width / 2 - (PLAYER_SPRITE_A[0].length * PIXEL_SIZE) / 2,
  y: canvas.height - PLAYER_SPRITE_A.length * PIXEL_SIZE - 20,
  width: PLAYER_SPRITE_A[0].length * PIXEL_SIZE,
  height: PLAYER_SPRITE_A.length * PIXEL_SIZE,
  speed: 5,
  shootCooldown: 100, // Milliseconds
  lastShotTime: 0,
  powerupType: "none",
  powerupTimer: 0,
};

// UFO
const ufo = {
  x: -UFO_SPRITE[0].length * PIXEL_SIZE,
  y: 20,
  width: UFO_SPRITE[0].length * PIXEL_SIZE,
  height: UFO_SPRITE.length * PIXEL_SIZE,
  speed: 2,
  status: 0, // 0 = inactive, 1 = active
};

const benevolentUfo = {
  x: -BENEVOLENT_UFO_SPRITE[0].length * PIXEL_SIZE,
  y: 60,
  width: BENEVOLENT_UFO_SPRITE[0].length * PIXEL_SIZE,
  height: BENEVOLENT_UFO_SPRITE.length * PIXEL_SIZE,
  speed: 2.5,
  status: 0, // 0 = inactive, 1 = active
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
    aliens[c][r] = {
      x: alienX,
      y: alienY,
      status: 1,
      type: alienType,
      isSquid: isSquid,
    };
  }
}

// Bunkers
const bunkerCount = 3;
const bunkerWidth = BUNKER_SPRITE[0].length * PIXEL_SIZE * 2;
const bunkerHeight = BUNKER_SPRITE.length * PIXEL_SIZE * 2;
const bunkerPadding =
  (canvas.width - bunkerCount * bunkerWidth) / (bunkerCount + 1);
const bunkers = [];
for (let i = 0; i < bunkerCount; i++) {
  bunkers.push({
    x: bunkerPadding + i * (bunkerWidth + bunkerPadding),
    y: player.y - bunkerHeight - 30,
    grid: BUNKER_SPRITE.map((row) => row.slice()), // Create a copy
  });
}

// Projectiles
let playerProjectiles = [];
let alienProjectiles = [];
let explosions = [];
let particles = [];
let powerups = [];

// --- Event listeners & Key handlers ---
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  if (e.key === "ArrowLeft" || e.key === "Left") {
    keys.ArrowLeft = true;
  } else if (e.key === "ArrowRight" || e.key === "Right") {
    keys.ArrowRight = true;
  } else if (e.key === " " || e.key === "Spacebar") {
    keys[" "] = true;
  }

  // Konami code logic
  userInputSequence.push(e.key);
  if (userInputSequence.length > konamiCode.length) {
    userInputSequence.shift();
  }

  if (JSON.stringify(userInputSequence) === JSON.stringify(konamiCode)) {
    squidStormActive = true;
    squidStormMessageTimer = 120; // 2 seconds at 60fps
    squidStormSound.play();
  }
}

function keyUp(e) {
  if (e.key === "ArrowLeft" || e.key === "Left") {
    keys.ArrowLeft = false;
  } else if (e.key === "ArrowRight" || e.key === "Right") {
    keys.ArrowRight = false;
  } else if (e.key === " " || e.key === "Spacebar") {
    keys[" "] = false;
  }
}

// --- Reset Game ---
if (playAgainBtn) {
  playAgainBtn.addEventListener("click", resetGame);
}

function resetGame() {
  score = 0;
  level = 1;

  // Reset colors to default
  Object.assign(colors, {
    player: { 1: "#708090", 2: "#00FF00" },
    ufo: "#FFD700",
    squid: "#FFA500",
    alien: "#32CD32",
    bunker: "#006400",
    projectile: "#90EE90",
    ground: "#228B22",
    text: "#90EE90",
    explosion: "#32CD32",
    squidExplosion: "#FFD700",
  });
  canvas.style.borderColor = "#32CD32";

  alienSpeed = 0.5;
  alienFireRate = 0.0005;
  squidStormActive = false;
  gameOver = false;
  gameWon = false;
  alienDirection = 1;

  player.x = canvas.width / 2 - (PLAYER_SPRITE_A[0].length * PIXEL_SIZE) / 2;

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
      aliens[c][r] = {
        x: alienX,
        y: alienY,
        status: 1,
        type: alienType,
        isSquid: isSquid,
      };
    }
  }

  bunkers.length = 0;
  for (let i = 0; i < bunkerCount; i++) {
    bunkers.push({
      x: bunkerPadding + i * (bunkerWidth + bunkerPadding),
      y: player.y - bunkerHeight - 30,
      grid: BUNKER_SPRITE.map((row) => row.slice()),
    });
  }

  playerProjectiles.length = 0;
  alienProjectiles.length = 0;
  explosions.length = 0;
  particles.length = 0;
  powerups.length = 0;
  player.powerupType = "none";
  player.powerupTimer = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;
  benevolentUfo.status = 0;
  benevolentUfo.x = -benevolentUfo.width;
  squidSquadActive = false;
  squidSquadTimer = 0;

  if (playAgainBtn) {
    playAgainBtn.style.display = "none";
  }
}

function resetAliensForNextLevel() {
  updateColorsForLevel(level);
  alienSpeed = 0.5 * Math.pow(1.5, level - 1);
  alienFireRate = 0.0005 + (level - 1) * 0.0005;

  // Update colors for the new level
  colors.ufo = shiftColor("#FFD700", level);
  colors.squid = shiftColor("#FFA500", level);
  colors.alien = shiftColor("#32CD32", level);
  colors.bunker = shiftColor("#006400", level);
  colors.ground = shiftColor("#228B22", level);
  canvas.style.borderColor = shiftColor("#90EE90", level);

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
      aliens[c][r] = {
        x: alienX,
        y: alienY,
        status: 1,
        type: alienType,
        isSquid: isSquid,
      };
    }
  }
  playerProjectiles.length = 0;
  alienProjectiles.length = 0;
  explosions.length = 0;
  particles.length = 0;
  powerups.length = 0;
  ufo.status = 0;
  ufo.x = -ufo.width;
  benevolentUfo.status = 0;
  benevolentUfo.x = -benevolentUfo.width;
  squidSquadActive = false;
  squidSquadTimer = 0;
}

// --- Game Functions ---
function shiftColor(hex, level) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
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
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB to hex
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}

function fireProjectile() {
  if (squidSquadActive) {
    const helperShipOffset = player.width + 10;
    const positions = [
      player.x,
      player.x - helperShipOffset,
      player.x + helperShipOffset,
      player.x - helperShipOffset * 2,
    ];
    positions.forEach((posX) => {
      const p = {
        x: posX + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 10,
        speed: 10,
        vx: 0,
        status: 1,
      };
      playerProjectiles.push(p);
    });
  } else if (squidStormActive) {
    // Triple shot with spread
    const baseProjectile = {
      y: player.y,
      width: 5,
      height: 10,
      speed: 10,
      status: 1,
    };
    playerProjectiles.push(
      { ...baseProjectile, x: player.x + player.width / 2 - 2.5, vx: -2 }, // Left
      { ...baseProjectile, x: player.x + player.width / 2 - 2.5, vx: 0 }, // Center
      { ...baseProjectile, x: player.x + player.width / 2 - 2.5, vx: 2 }, // Right
    );
  } else if (player.powerupType === "doubleLaser") {
    const p1 = {
      x: player.x + player.width / 4 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
      speed: 10,
      vx: 0,
      status: 1,
    };
    const p2 = {
      x: player.x + (player.width * 3) / 4 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
      speed: 10,
      vx: 0,
      status: 1,
    };
    playerProjectiles.push(p1, p2);
  } else {
    const p = {
      x: player.x + player.width / 2 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
      speed: 10,
      vx: 0,
      status: 1,
    };
    playerProjectiles.push(p);
  }
  shootSound.play();
}

function fireAlienProjectile(alien) {
  const p = {
    x: alien.x + alienWidth / 2 - 2.5,
    y: alien.y + alienHeight,
    width: 5,
    height: 10,
    speed: 5,
    status: 1,
  };
  alienProjectiles.push(p);
}

function createExplosion(x, y, color, count = 20) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      color: color,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: Math.random() * 20 + 10, // Lifespan in frames
    });
  }
}

// --- Main Game Loop ---
function update() {
  if (gameOver && !gameConfig.isDemo) return;

  animationFrame++;

  // Power-up timer
  if (player.powerupTimer > 0) {
    player.powerupTimer--;
  } else {
    player.powerupType = "none";
  }

  // Squid Squad timer
  if (squidSquadTimer > 0) {
    squidSquadTimer--;
  } else {
    squidSquadActive = false;
  }

  if (!gameConfig.isDemo) {
    // Horizontal movement
    let dx = 0;
    if (keys.ArrowLeft && !keys.ArrowRight) {
      dx = -player.speed;
    } else if (keys.ArrowRight && !keys.ArrowLeft) {
      dx = player.speed;
    }

    // Shooting logic
    const currentTime = Date.now();
    if (keys[" "] && currentTime - player.lastShotTime > player.shootCooldown) {
      fireProjectile();
      player.lastShotTime = currentTime;
    }

    player.x += dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width)
      player.x = canvas.width - player.width;
  }

  playerProjectiles.forEach((p) => {
    if (p.status === 1) {
      p.y -= p.speed;
      p.x += p.vx; // Horizontal movement
      if (p.y < 0 || p.x < 0 || p.x > canvas.width) p.status = 0;
    }
  });

  alienProjectiles.forEach((p) => {
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

  // Benevolent UFO Logic
  if (benevolentUfo.status === 0 && Math.random() < 0.0002) {
    // Lower spawn rate
    benevolentUfo.status = 1;
    benevolentUfo.x = -benevolentUfo.width;
  }

  if (benevolentUfo.status === 1) {
    benevolentUfo.x += benevolentUfo.speed;
    if (benevolentUfo.x > canvas.width) {
      benevolentUfo.status = 0;
    }
  }

  let changeDirection = false;
  aliens.flat().forEach((alien) => {
    if (alien.status === 1) {
      alien.x += alienSpeed * alienDirection;
      if (alien.x + alienWidth > canvas.width || alien.x < 0)
        changeDirection = true;
      if (alien.y + alienHeight >= player.y) gameOver = true;
      if (Math.random() < alienFireRate) fireAlienProjectile(alien);
    }
  });

  if (changeDirection) {
    alienDirection *= -1;
    alienSpeed *= 1.15;
    aliens.flat().forEach((alien) => (alien.y += alienHeight / 2));
  }

  // --- Collision Detection ---
  playerProjectiles.forEach((p) => {
    if (p.status === 1) {
      // Player projectile vs Aliens
      aliens.flat().forEach((alien) => {
        if (
          alien.status === 1 &&
          p.x > alien.x &&
          p.x < alien.x + alienWidth &&
          p.y > alien.y &&
          p.y < alien.y + alienHeight
        ) {
          alien.status = 0;
          p.status = 0;
          if (alien.isSquid) {
            score += 50;
            createExplosion(
              alien.x + alienWidth / 2,
              alien.y + alienHeight / 2,
              colors.squid,
            );
          } else {
            score += 10;
            explosions.push({
              x: alien.x,
              y: alien.y,
              color: colors.explosion,
              size: 30,
              timer: 10,
            });
          }

          // Add a chance to spawn a power-up
          if (Math.random() < 0.1) {
            // 10% chance
            powerups.push({
              x: alien.x + alienWidth / 2,
              y: alien.y + alienHeight / 2,
              width: JULES_LOGO_SPRITE[0].length * PIXEL_SIZE,
              height: JULES_LOGO_SPRITE.length * PIXEL_SIZE,
              speed: 2,
              type: "double-laser",
              status: 1,
            });
          }
          explosionSound.play();

          // Spawn power-up
          if (Math.random() < 0.05) {
            // 5% chance
            powerups.push({
              x: alien.x + alienWidth / 2,
              y: alien.y + alienHeight / 2,
              width: JULES_LOGO_SPRITE[0].length * PIXEL_SIZE,
              height: JULES_LOGO_SPRITE.length * PIXEL_SIZE,
              speed: 2,
              status: 1,
            });
          }
        }
      });

      // Player projectile vs UFO
      if (
        ufo.status === 1 &&
        p.x > ufo.x &&
        p.x < ufo.x + ufo.width &&
        p.y > ufo.y &&
        p.y < ufo.y + ufo.height
      ) {
        ufo.status = 0;
        p.status = 0;
        score += 100;
        explosionSound.play();
      }

      // Player projectile vs Benevolent UFO
      if (
        benevolentUfo.status === 1 &&
        p.x > benevolentUfo.x &&
        p.x < benevolentUfo.x + benevolentUfo.width &&
        p.y > benevolentUfo.y &&
        p.y < benevolentUfo.y + benevolentUfo.height
      ) {
        benevolentUfo.status = 0;
        p.status = 0;
        score += 200;
        benevolentHitSound.play();
        createExplosion(
          benevolentUfo.x + benevolentUfo.width / 2,
          benevolentUfo.y + benevolentUfo.height / 2,
          colors.benevolentUfo[1],
          40,
        );
        squidSquadActive = true;
        squidSquadTimer = 900; // 15 seconds at 60fps
      }
    }
  });

  // Draw explosions
  explosions.forEach((explosion) => {
    ctx.fillStyle = explosion.color;
    ctx.beginPath();
    ctx.arc(
      explosion.x + alienWidth / 2,
      explosion.y + alienHeight / 2,
      explosion.size * (explosion.timer / 10),
      0,
      Math.PI * 2,
    );
    ctx.fill();
  });

  // Alien projectiles vs Player
  if (!gameConfig.isDemo) {
    alienProjectiles.forEach((p) => {
      if (
        p.status === 1 &&
        p.x > player.x &&
        p.x < player.x + player.width &&
        p.y > player.y &&
        p.y < player.y + player.height
      ) {
        p.status = 0;
        gameOver = true;
      }
    });
  }

  // Projectiles vs Bunkers
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

  if (aliens.flat().filter((a) => a.status === 1).length <= 10) {
    level++;
    resetAliensForNextLevel();
  }

  if (gameOver && !gameConfig.isDemo) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("spaceInvadersHighScore", highScore);
    }
  }

  // Filter out inactive projectiles
  playerProjectiles = playerProjectiles.filter((p) => p.status === 1);
  alienProjectiles = alienProjectiles.filter((p) => p.status === 1);

  // Update explosions
  explosions.forEach((explosion, index) => {
    explosion.timer--;
    if (explosion.timer <= 0) {
      explosions.splice(index, 1);
    }
  });

  if (squidStormMessageTimer > 0) {
    squidStormMessageTimer--;
  }

  // Update particles
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life--;
    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });

  // Update powerups
  powerups.forEach((powerup, index) => {
    if (powerup.status === 1) {
      powerup.y += powerup.speed;
      if (powerup.y > canvas.height) {
        powerup.status = 0;
      }

      // Player collision
      if (
        player.x < powerup.x + powerup.width &&
        player.x + player.width > powerup.x &&
        player.y < powerup.y + powerup.height &&
        player.y + player.height > powerup.y
      ) {
        powerup.status = 0;
        player.powerupType = "doubleLaser";
        player.powerupTimer = 300; // 5 seconds at 60fps
      }
    }
  });
  powerups = powerups.filter((p) => p.status === 1);
}

// --- Drawing Functions ---
function drawPixelArt(sprite, x, y, color, pixelSize) {
  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      const pixel = sprite[r][c];
      if (pixel !== 0) {
        if (typeof color === "object") {
          ctx.fillStyle = color[pixel];
        } else {
          ctx.fillStyle = color;
        }
        ctx.fillRect(
          x + c * pixelSize,
          y + r * pixelSize,
          pixelSize,
          pixelSize,
        );
      }
    }
  }
}

function draw() {
  const scale = canvas.width / 800;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(scale, scale);

  // Darken background based on level
  const backgroundDarkness = Math.min(0.5, (level - 1) * 0.05);
  ctx.fillStyle = `rgba(0, 0, 0, ${backgroundDarkness})`;
  ctx.fillRect(0, 0, 800, 600);

  if (squidStormActive) {
    drawPixelArt(
      SQUIDSTORM_SHIP_SPRITE,
      player.x,
      player.y,
      colors.dev,
      PIXEL_SIZE,
    );
  } else {
    const playerSprite =
      Math.floor(animationFrame / 30) % 2 === 0
        ? PLAYER_SPRITE_A
        : PLAYER_SPRITE_B;
    drawPixelArt(playerSprite, player.x, player.y, colors.player, PIXEL_SIZE);
  }

  if (squidSquadActive) {
    const playerSprite =
      Math.floor(animationFrame / 30) % 2 === 0
        ? PLAYER_SPRITE_A
        : PLAYER_SPRITE_B;
    const helperShipOffset = player.width + 10;
    // Draw three helper ships
    drawPixelArt(
      playerSprite,
      player.x - helperShipOffset,
      player.y,
      colors.player,
      PIXEL_SIZE,
    );
    drawPixelArt(
      playerSprite,
      player.x + helperShipOffset,
      player.y,
      colors.player,
      PIXEL_SIZE,
    );
    drawPixelArt(
      playerSprite,
      player.x - helperShipOffset * 2,
      player.y,
      colors.player,
      PIXEL_SIZE,
    );
  }

  if (ufo.status === 1) {
    drawPixelArt(UFO_SPRITE, ufo.x, ufo.y, colors.ufo, PIXEL_SIZE);
  }

  if (benevolentUfo.status === 1) {
    drawPixelArt(
      BENEVOLENT_UFO_SPRITE,
      benevolentUfo.x,
      benevolentUfo.y,
      colors.benevolentUfo,
      PIXEL_SIZE,
    );
  }

  powerups.forEach((powerup) => {
    if (powerup.status === 1) {
      // Pulsating color effect
      const pulsatingFactor = Math.abs(Math.sin(animationFrame / 15));
      const color = `rgba(255, 255, 0, ${0.5 + pulsatingFactor * 0.5})`;
      drawPixelArt(JULES_LOGO_SPRITE, powerup.x, powerup.y, color, PIXEL_SIZE);
    }
  });

  aliens.flat().forEach((alien) => {
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

  bunkers.forEach((bunker) => {
    ctx.fillStyle = colors.bunker;
    const blockWidth = PIXEL_SIZE * 2;
    const blockHeight = PIXEL_SIZE * 2;
    for (let r = 0; r < bunker.grid.length; r++) {
      for (let c = 0; c < bunker.grid[r].length; c++) {
        if (bunker.grid[r][c] === 1) {
          ctx.fillRect(
            bunker.x + c * blockWidth,
            bunker.y + r * blockHeight,
            blockWidth,
            blockHeight,
          );
        }
      }
    }
  });

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

  // Draw Ground Line
  ctx.fillStyle = colors.ground;
  ctx.fillRect(0, canvas.height - 10, canvas.width, 5);

  ctx.fillStyle = colors.text;
  ctx.font = '20px "Press Start 2P"';
  ctx.fillText("Score: " + score, 10, 25);
  ctx.textAlign = "center";
  ctx.fillText("Level: " + level, canvas.width / 2, 25);
  ctx.textAlign = "right";
  ctx.fillText("High Score: " + highScore, canvas.width - 10, 25);
  ctx.textAlign = "left";

  if (squidStormMessageTimer > 0) {
    // Purple flash effect for the first 20 frames
    if (squidStormMessageTimer > 100) {
      const flashOpacity = (squidStormMessageTimer - 100) / 20; // Fades out from 1.0 to 0.05
      ctx.fillStyle = `rgba(147, 112, 219, ${flashOpacity * 0.5})`; // #9370DB with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = "#9370DB";
    ctx.font = '20px "Press Start 2P"';
    ctx.textAlign = "left";
    ctx.fillText("SQUIDSTORM ACTIVE", 10, 60);
  }

  if (gameOver && !gameConfig.isDemo) {
    ctx.fillStyle = colors.text;
    ctx.font = '50px "Press Start 2P"';
    ctx.textAlign = "center";
    ctx.fillText(
      gameWon ? "YOU WIN!" : "GAME OVER",
      canvas.width / 2,
      canvas.height / 2,
    );
    if (playAgainBtn) playAgainBtn.style.display = "block";
  } else {
    if (playAgainBtn) playAgainBtn.style.display = "none";
  }

  // Draw particles
  particles.forEach((particle) => {
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = Math.max(0, particle.life / 20); // Fade out
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0; // Reset alpha
  });

  // Draw powerups
  powerups.forEach((powerup) => {
    if (powerup.status === 1) {
      drawPixelArt(
        JULES_LOGO_SPRITE,
        powerup.x,
        powerup.y,
        colors.powerup,
        PIXEL_SIZE,
      );
    }
  });

  ctx.restore();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function loadHighScore() {
  const storedHighScore = localStorage.getItem("spaceInvadersHighScore");
  if (storedHighScore) {
    highScore = parseInt(storedHighScore);
  }
}

function resizeCanvas() {
  const aspectRatio = 800 / 600;
  const { innerWidth, innerHeight } = window;

  let newWidth, newHeight;

  if (innerWidth / innerHeight > aspectRatio) {
    newHeight = innerHeight;
    newWidth = newHeight * aspectRatio;
  } else {
    newWidth = innerWidth;
    newHeight = newWidth / aspectRatio;
  }

  canvas.style.width = `${newWidth}px`;
  canvas.style.height = `${newHeight}px`;

  // Set the canvas resolution to its original size for crisp pixel art
  canvas.width = 800;
  canvas.height = 600;
}

function initGame(config) {
  gameConfig = config;
  loadHighScore();
  updateColorsForLevel(level);

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    mobileControls.style.display = "flex";

    leftBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keys.ArrowLeft = true;
    });
    leftBtn.addEventListener("touchend", () => {
      keys.ArrowLeft = false;
    });
    rightBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keys.ArrowRight = true;
    });
    rightBtn.addEventListener("touchend", () => {
      keys.ArrowRight = false;
    });
    fireBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keys[" "] = true;
    });
    fireBtn.addEventListener("touchend", () => {
      keys[" "] = false;
    });
  }

  gameLoop();
}
