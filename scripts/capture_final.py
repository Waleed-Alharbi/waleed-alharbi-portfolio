from dataclasses import dataclass
from pathlib import Path

from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "screenshots"
URL = "http://127.0.0.1:5173"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

COMBINATIONS = (
    ("en", "light"),
    ("en", "dark"),
    ("ar", "light"),
    ("ar", "dark"),
)

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1080},
    "mobile": {"width": 390, "height": 844},
}


@dataclass(frozen=True)
class CaptureView:
    name: str
    selectors: tuple[str, ...]


# Preferred selectors describe the redesigned layout. Fallbacks keep the
# capture script usable while a branch with the earlier layout is running.
DETAIL_VIEWS = (
    CaptureView("hero", ("#top",)),
    CaptureView("about", ("#about",)),
    CaptureView("experience-timeline", ("#experience .journey-list", "#experience")),
    CaptureView(
        "work-featured",
        ("#work .featured-work-grid", "#work .project-feature:first-of-type"),
    ),
    CaptureView(
        "work-compact",
        ("#work .compact-work", "#work .project-feature:nth-of-type(2)"),
    ),
    CaptureView("skills", ("#skills",)),
    CaptureView("contact", ("#contact",)),
)


def new_context(
    browser: Browser,
    viewport_name: str,
    language: str,
    theme: str,
) -> BrowserContext:
    browser_context = browser.new_context(
        viewport=VIEWPORTS[viewport_name],
        reduced_motion="reduce",
        device_scale_factor=1,
        color_scheme=theme,
    )
    browser_context.add_init_script(
        script=f"""
            localStorage.setItem('waleed-language', {language!r});
            localStorage.setItem('waleed-theme', {theme!r});
        """
    )
    return browser_context


def wait_for_assets(page: Page) -> None:
    page.evaluate(
        """
        async () => {
          await document.fonts.ready;
          const images = Array.from(document.images);
          images.forEach((image) => { image.loading = 'eager'; });
          await Promise.all(images.map(async (image) => {
            try {
              if (!image.complete) {
                await new Promise((resolve) => {
                  image.addEventListener('load', resolve, { once: true });
                  image.addEventListener('error', resolve, { once: true });
                });
              }
              await image.decode();
            } catch (_) {
              // Failed assets belong in the QA report, but should not stop
              // the remaining screenshots from being generated.
            }
          }));
        }
        """
    )


def load(page: Page, path: str = "/") -> None:
    page.goto(f"{URL}{path}", wait_until="networkidle")
    wait_for_assets(page)
    page.add_style_tag(content=".skip-link { display: none !important; }")
    page.wait_for_timeout(120)


def first_available(page: Page, selectors: tuple[str, ...]):
    for selector in selectors:
        locator = page.locator(selector).first
        if locator.count() > 0:
            locator.wait_for(state="visible")
            return locator
    raise AssertionError(f"No capture target found for: {', '.join(selectors)}")


def capture_detail(page: Page, prefix: str, view: CaptureView) -> Path:
    locator = first_available(page, view.selectors)
    locator.scroll_into_view_if_needed()
    wait_for_assets(page)
    page.wait_for_timeout(100)
    page.evaluate("document.activeElement instanceof HTMLElement && document.activeElement.blur()")
    destination = OUTPUT / f"{prefix}-{view.name}.png"
    locator.screenshot(path=destination, animations="disabled")
    return destination


def capture_full_page(page: Page, name: str) -> Path:
    destination = OUTPUT / name
    page.evaluate("document.activeElement instanceof HTMLElement && document.activeElement.blur()")
    page.screenshot(path=destination, full_page=True, animations="disabled")
    return destination


def capture_home_matrix(browser: Browser) -> list[Path]:
    captured: list[Path] = []

    for viewport_name in VIEWPORTS:
        for language, theme in COMBINATIONS:
            browser_context = new_context(browser, viewport_name, language, theme)
            page = browser_context.new_page()
            load(page)
            prefix = f"{viewport_name}-{language}-{theme}"

            captured.append(capture_full_page(page, f"{prefix}-full.png"))

            # Detailed crops are produced once per viewport. The full-page
            # matrix above remains the source for every language/theme review.
            if language == "en" and theme == "light":
                for view in DETAIL_VIEWS:
                    captured.append(capture_detail(page, prefix, view))

            if viewport_name == "mobile":
                page.evaluate("window.scrollTo(0, 0)")
                page.locator(".menu-button").click()
                page.locator("#mobile-menu").wait_for(state="visible")
                page.wait_for_timeout(100)
                menu_path = OUTPUT / f"{prefix}-menu.png"
                page.screenshot(path=menu_path, animations="disabled")
                captured.append(menu_path)

            page.close()
            browser_context.close()

    return captured


def capture_case_study(browser: Browser) -> list[Path]:
    captured: list[Path] = []

    for viewport_name in VIEWPORTS:
        browser_context = new_context(browser, viewport_name, "en", "light")
        page = browser_context.new_page()
        load(page, "/work/helpdesk")
        captured.append(
            capture_full_page(
                page,
                f"{viewport_name}-en-light-case-helpdesk-full.png",
            )
        )
        page.close()
        browser_context.close()

    return captured


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=CHROME, headless=True)
        captured = capture_home_matrix(browser)
        captured.extend(capture_case_study(browser))
        browser.close()

    print(f"screenshots_captured={len(captured)}")
    for path in captured:
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
