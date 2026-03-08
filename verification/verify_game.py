from playwright.sync_api import sync_playwright
import os
import time

def verify_game(page):
    game_path = os.path.abspath("game.html")
    page.goto(f"file://{game_path}")

    # Wait for the game canvas to be visible
    page.wait_for_selector("#gameCanvas")

    # Let the game loop run for a bit to ensure projectiles might be on screen
    time.sleep(1)

    # Press Space to fire a projectile
    page.keyboard.press(" ")

    # Wait a tiny bit for the projectile to be drawn
    time.sleep(0.1)

    # Take a screenshot
    page.screenshot(path="verification/game_screenshot.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_game(page)
        finally:
            browser.close()
