from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "screenshots"
URL = "http://127.0.0.1:5173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def capture(page, name: str, selector: str | None = None) -> None:
    page.goto(URL, wait_until="networkidle")
    if selector:
        page.locator(selector).scroll_into_view_if_needed()
    page.wait_for_timeout(250)
    page.screenshot(path=OUTPUT / name)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROME, headless=True)
    context = browser.new_context(
        viewport={"width": 1440, "height": 1080},
        color_scheme="dark",
        reduced_motion="reduce",
        device_scale_factor=1,
    )
    page = context.new_page()
    capture(page, "checkpoint-hero-final.png")
    capture(page, "checkpoint-about-final.png", "#about")
    capture(page, "checkpoint-helpdesk-final.png", ".project-helpdesk")
    browser.close()
