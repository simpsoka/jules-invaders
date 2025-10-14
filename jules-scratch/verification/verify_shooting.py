from playwright.sync_api import sync_playwright
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the local HTML file
        file_path = os.path.join(os.path.dirname(__file__), '..', '..', 'index.html')
        page.goto(f'file://{os.path.abspath(file_path)}')

        # Wait for the game to load
        page.wait_for_selector('#gameCanvas')

        # Press and hold the spacebar and right arrow key
        page.keyboard.down(' ')
        page.keyboard.down('ArrowRight')

        # Wait for a moment to allow projectiles to be fired
        page.wait_for_timeout(500)

        # Release the keys
        page.keyboard.up(' ')
        page.keyboard.up('ArrowRight')

        # Take a screenshot
        screenshot_path = os.path.join(os.path.dirname(__file__), 'verification.png')
        page.screenshot(path=screenshot_path)

        browser.close()

if __name__ == '__main__':
    run_verification()
