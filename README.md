# Jules Invaders

Jules Invaders is a classic arcade-style shooter game, inspired by the original Space Invaders. This web-based game is built with vanilla JavaScript and HTML5 Canvas.

## About the Game

In Jules Invaders, you control a spaceship at the bottom of the screen, and your mission is to defeat waves of descending aliens. The game gets progressively harder with each level, as the aliens become faster and more aggressive.

## How to Play

- **Move:** Use the left and right arrow keys to move your spaceship.
- **Shoot:** Press the spacebar to fire projectiles at the aliens.
- **Mobile:** On touch-enabled devices, on-screen controls will appear for movement and firing.

## Features

- **Classic Gameplay:** Experience the retro feel of the original Space Invaders.
- **Increasing Difficulty:** The game's difficulty scales with each level, keeping you challenged.
- **Power-ups:** Collect power-ups to enhance your ship's abilities.
- **High Score:** The game saves your high score locally, so you can compete against yourself.
- **Easter Eggs:** Discover hidden secrets, like the Konami Code, for special in-game events.

## Development Setup

The game is a static website and does not require a build step. To run the game locally, you can simply open the `index.html` file in your web browser.

For development, you will need to have Node.js and npm installed. The project uses Playwright for frontend verification. To set up the development environment, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

3. **Run the Game:**
   Open the `index.html` or `game.html` file in your browser.
