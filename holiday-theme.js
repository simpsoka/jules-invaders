const holidaySprites = {
    PLAYER_SPRITE_A: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 2, 2, 0, 2, 2, 0, 0]
    ],
    SQUIDSTORM_SHIP_SPRITE: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 2, 1, 1, 0, 0],
        [0, 1, 2, 1, 2, 1, 1, 0],
        [1, 2, 1, 2, 1, 2, 1, 1],
        [0, 3, 3, 0, 3, 3, 0, 0]
    ],
    PLAYER_SPRITE_B: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 2, 2, 0, 2, 2, 0, 0]
    ],
    ALIEN_SPRITE_1: [
        [0, 1, 1, 0],
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [1, 0, 0, 1]
    ],
    ALIEN_SPRITE_2: [
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 0]
    ],
    ALIEN_SPRITE_3: [
        [0, 1, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ],
    ALIEN_SPRITE_1_DANCE: [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ],
    ALIEN_SPRITE_2_DANCE: [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [1, 1, 1, 1]
    ],
    ALIEN_SPRITE_3_DANCE: [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1]
    ],
    BUNKER_SPRITE: [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ],
    UFO_SPRITE: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 1]
    ]
};

const holidayColors = {
    player: { 1: '#D32F2F', 2: '#FFD700' },
    dev: { 1: '#FF0000', 2: '#00FF00', 3: '#0000FF', 4: '#FFFF00', 5: '#FF00FF' },
    ufo: '#4CAF50',
    benevolentUfo: { 1: '#00FFFF', 2: '#FFFFFF' },
    squid: '#9370DB',
    alien: '#FFFFFF',
    bunker: '#FFFFFF',
    projectile: '#FFD700',
    ground: '#FFFFFF',
    text: '#FFFFFF',
    powerup: '#FFD700',
    explosion: '#FFD700',
    squidExplosion: 'red'
};

const holidaySounds = {
    shoot: 'assets/jingle-shot.wav',
    explosion: 'assets/sleigh-bell-explosion.wav'
};
