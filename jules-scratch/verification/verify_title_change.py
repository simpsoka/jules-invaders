import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the absolute path to the game.html file
        file_path = os.path.abspath('game.html')

        # Navigate to the local HTML file
        page.goto(f'file://{file_path}')

        # Verify the page title
        expect(page).to_have_title("Jules Invaders")

        # Verify the h1 text
        h1_element = page.locator('h1')
        expect(h1_element).to_have_text("Jules Invaders")

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()