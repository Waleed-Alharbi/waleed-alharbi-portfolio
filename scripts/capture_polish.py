from pathlib import Path

from playwright.sync_api import Browser, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "screenshots"
URL = "http://127.0.0.1:5173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def new_page(browser: Browser, width: int = 1440, height: int = 1080):
    context = browser.new_context(viewport={"width": width, "height": height}, reduced_motion="reduce", color_scheme="light")
    return context, context.new_page()


def configure(page, language: str, theme: str, path: str = "/") -> None:
    page.goto(f"{URL.rstrip('/')}{path}", wait_until="domcontentloaded")
    page.evaluate("([language, theme]) => { localStorage.setItem('waleed-language', language); localStorage.setItem('waleed-theme', theme); }", [language, theme])
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(250)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROME, headless=True)

    desktop, page = new_page(browser)
    configure(page, "en", "light")
    page.screenshot(path=OUTPUT / "hero.png")
    page.evaluate("window.scrollTo(0, document.querySelector('#contact').offsetTop - 88)")
    page.wait_for_timeout(250)
    page.screenshot(path=OUTPUT / "contact.png")
    desktop.close()

    arabic, page = new_page(browser)
    configure(page, "ar", "light")
    page.screenshot(path=OUTPUT / "arabic.png")
    arabic.close()

    dark, page = new_page(browser)
    configure(page, "en", "dark")
    page.screenshot(path=OUTPUT / "dark.png")
    dark.close()

    mobile, page = new_page(browser, 390, 844)
    configure(page, "en", "light")
    page.screenshot(path=OUTPUT / "mobile.png")
    mobile.close()

    full, page = new_page(browser)
    configure(page, "en", "light")
    height = page.evaluate("document.documentElement.scrollHeight")
    for y in range(0, height, 900):
        page.evaluate("y => window.scrollTo(0, y)", y)
        page.wait_for_timeout(45)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(200)
    page.screenshot(path=OUTPUT / "home.png", full_page=True)
    full.close()

    browser.close()
