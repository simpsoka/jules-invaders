from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('file:///app/game.html')
    page.screenshot(path='game_screenshot.png')
    page.goto('file:///app/index.html')
    page.screenshot(path='index_screenshot.png')
    browser.close()
