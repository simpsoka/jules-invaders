from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Load the game.html file
        cwd = os.getcwd()
        file_url = f"file://{os.path.join(cwd, 'game.html')}"
        print(f"Loading: {file_url}")
        page.goto(file_url)

        # Wait for canvas
        page.wait_for_selector("#gameCanvas")

        # Wait a bit for game to render
        page.wait_for_timeout(500)

        # Take screenshot
        screenshot_path = "verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
        browser.close()

if __name__ == "__main__":
    run()
