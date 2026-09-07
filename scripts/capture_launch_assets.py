from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
URL = "http://127.0.0.1:5173"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")


def main() -> None:
    with sync_playwright() as playwright:
        launch_options = {"headless": True}
        if CHROME.exists():
            launch_options["executable_path"] = str(CHROME)
        browser = playwright.chromium.launch(**launch_options)

        context = browser.new_context(
            viewport={"width": 1200, "height": 630},
            color_scheme="dark",
            reduced_motion="no-preference",
            device_scale_factor=1,
        )
        context.add_init_script(
            """
            localStorage.setItem('waleed-language', 'en');
            localStorage.setItem('waleed-theme', 'dark');
            sessionStorage.setItem('waleed-intro-seen', 'skip');
            """
        )
        page = context.new_page()
        page.goto(URL, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(700)
        page.add_style_tag(content=".skip-link { display: none !important; }")
        page.screenshot(path=PUBLIC / "social-preview.jpg", type="jpeg", quality=88, full_page=False)
        contact = page.locator("#contact")
        contact.scroll_into_view_if_needed()
        page.wait_for_function("document.querySelector('.contact-video-finale video')?.readyState >= 2")
        page.wait_for_timeout(500)
        contact.screenshot(path=ROOT / "screenshots" / "launch-desktop-contact.png")
        context.close()

        icon_context = browser.new_context(
            viewport={"width": 192, "height": 192},
            device_scale_factor=1,
        )
        icon_page = icon_context.new_page()
        icon_page.set_content(
            f"""
            <style>
              * {{ box-sizing: border-box; }}
              html, body {{ width: 192px; height: 192px; margin: 0; overflow: hidden; background: #171715; }}
              img {{ width: 192px; height: 192px; display: block; }}
            </style>
            <img src="{URL}/favicon.svg" alt="" />
            """
        )
        icon_page.locator("img").wait_for(state="visible")
        icon_page.screenshot(path=PUBLIC / "favicon-192.png", full_page=False)
        icon_context.close()
        browser.close()


if __name__ == "__main__":
    main()
