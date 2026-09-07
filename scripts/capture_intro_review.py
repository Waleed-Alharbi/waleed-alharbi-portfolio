from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "screenshots"
URL = "http://127.0.0.1:5174/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROME)

    for language in ("en", "ar"):
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        context.add_init_script(
            f"localStorage.setItem('waleed-language', '{language}');"
            "localStorage.setItem('waleed-theme', 'dark');"
        )
        page = context.new_page()
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1050)
        if not page.locator(".portfolio-intro").is_visible():
            raise AssertionError(f"Intro did not appear in {language}")
        page.screenshot(path=OUTPUT / f"desktop-{language}-intro.png")
        if language == "en":
            page.wait_for_timeout(2300)
            page.reload(wait_until="networkidle")
            page.wait_for_timeout(120)
            if not page.locator(".portfolio-intro").is_visible():
                raise AssertionError("Intro did not reappear after a full reload")
        context.close()

    context = browser.new_context(viewport={"width": 390, "height": 844})
    context.add_init_script(
        "localStorage.setItem('waleed-language', 'ar');"
        "localStorage.setItem('waleed-theme', 'dark');"
    )
    page = context.new_page()
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(1050)
    page.screenshot(path=OUTPUT / "mobile-ar-intro.png")
    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    if overflow > 1:
        raise AssertionError(f"Intro horizontal overflow: {overflow}px")
    context.close()

    context = browser.new_context(
        viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
    )
    context.add_init_script(
        "localStorage.setItem('waleed-language', 'en');"
        "localStorage.setItem('waleed-theme', 'light');"
        "sessionStorage.setItem('waleed-intro-seen', 'skip');"
    )
    page = context.new_page()
    page.goto(URL, wait_until="networkidle")
    page.locator("#top").screenshot(path=OUTPUT / "desktop-en-light-hero-enhanced.png")
    page.locator("#work .featured-work-grid").scroll_into_view_if_needed()
    page.locator("#work .featured-work-grid").screenshot(
        path=OUTPUT / "desktop-en-helpdesk-soft-cover.png"
    )
    page.locator("#about .about-profile-card").scroll_into_view_if_needed()
    page.locator("#about .about-profile-card").screenshot(
        path=OUTPUT / "desktop-en-about-actions.png"
    )
    context.close()
    browser.close()
