from __future__ import annotations

import sys
from collections import Counter, defaultdict
from pathlib import Path

from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright


URL = "http://127.0.0.1:5173"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
PROJECTS = ("helpdesk", "soc", "waqttech", "basira", "bunya")
COMBINATIONS = (("en", "light"), ("en", "dark"), ("ar", "light"), ("ar", "dark"))
VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1080},
    "mobile": {"width": 390, "height": 844},
}


class Audit:
    def __init__(self) -> None:
        self.issues: dict[tuple[str, str], list[str]] = defaultdict(list)
        self.stats: Counter[str] = Counter()

    def fail(self, code: str, label: str, detail: str) -> None:
        key = (code, detail[:360])
        if label not in self.issues[key]:
            self.issues[key].append(label)

    def check(self, condition: bool, code: str, label: str, detail: str) -> None:
        if not condition:
            self.fail(code, label, detail)

    def report(self) -> int:
        if self.issues:
            occurrences = sum(len(labels) for labels in self.issues.values())
            print(f"audit=fail issues={len(self.issues)} occurrences={occurrences}")
            for (code, detail), labels in list(self.issues.items())[:30]:
                shown = ", ".join(labels[:6])
                suffix = f" +{len(labels) - 6}" if len(labels) > 6 else ""
                print(f"- {code}: {detail} [{shown}{suffix}]")
            if len(self.issues) > 30:
                print(f"- additional_issue_types={len(self.issues) - 30}")
            return 1

        print(
            "audit=pass "
            f"home={self.stats['home']} "
            f"case_pages={self.stats['case']} "
            f"mobile_menus={self.stats['mobile_menu']} "
            "work=2_featured+3_compact "
            "overflow=0 alt=pass console=0 reduced_motion=pass cv=200"
        )
        return 0


def new_context(
    browser: Browser,
    viewport_name: str,
    language: str,
    theme: str,
    reduced_motion: str = "reduce",
) -> BrowserContext:
    context = browser.new_context(
        viewport=VIEWPORTS[viewport_name],
        color_scheme=theme,
        reduced_motion=reduced_motion,
    )
    context.add_init_script(
        script=f"""
            localStorage.setItem('waleed-language', {language!r});
            localStorage.setItem('waleed-theme', {theme!r});
        """
    )
    return context


def attach_errors(page: Page, audit: Audit, current: dict[str, str]) -> None:
    def console(message) -> None:
        if message.type == "error":
            audit.fail("console", current["label"], message.text)

    def page_error(error) -> None:
        audit.fail("page-error", current["label"], str(error))

    page.on("console", console)
    page.on("pageerror", page_error)


def load(page: Page, path: str) -> tuple[int | None, list[str]]:
    response = page.goto(f"{URL}{path}", wait_until="networkidle")
    broken = page.evaluate(
        """
        async () => {
          await document.fonts.ready;
          const images = Array.from(document.images);
          images.forEach((image) => { image.loading = 'eager'; });
          await Promise.all(images.map((image) => Promise.race([
            image.decode().catch(() => undefined),
            new Promise((resolve) => setTimeout(resolve, 5000)),
          ])));
          return images
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src || '<unknown>');
        }
        """
    )
    return (response.status if response else None), broken


def overflow_metrics(page: Page) -> dict:
    return page.evaluate(
        """
        () => {
          const root = document.documentElement;
          const body = document.body;
          const width = Math.max(root.scrollWidth, body.scrollWidth, document.scrollingElement?.scrollWidth || 0);
          const delta = width - window.innerWidth;
          const offenders = delta > 1
            ? Array.from(body.querySelectorAll('*')).map((element) => {
                const rect = element.getBoundingClientRect();
                const style = getComputedStyle(element);
                const name = element.tagName.toLowerCase()
                  + (element.id ? `#${element.id}` : '')
                  + (typeof element.className === 'string' && element.className
                    ? `.${element.className.trim().split(/\\s+/).slice(0, 3).join('.')}` : '');
                return { name, left: Math.round(rect.left), right: Math.round(rect.right), display: style.display };
              }).filter((item) => item.display !== 'none' && (item.left < -1 || item.right > innerWidth + 1))
                .slice(0, 5)
            : [];
          return { width, viewport: innerWidth, delta, offenders };
        }
        """
    )


def audit_basics(
    page: Page,
    audit: Audit,
    label: str,
    language: str,
    theme: str,
    broken: list[str],
) -> None:
    expected_dir = "rtl" if language == "ar" else "ltr"
    audit.check(page.locator("html").get_attribute("lang") == language, "language", label, f"expected {language}")
    audit.check(page.locator("html").get_attribute("dir") == expected_dir, "direction", label, f"expected {expected_dir}")
    audit.check(page.locator("html").get_attribute("data-theme") == theme, "theme", label, f"expected {theme}")
    missing_alt = page.locator("img:not([alt]), img[alt='']").count()
    audit.check(missing_alt == 0, "alt", label, f"missing_or_empty={missing_alt}")
    audit.check(not broken, "broken-image", label, ", ".join(broken[:3]))
    metrics = overflow_metrics(page)
    audit.check(
        metrics["delta"] <= 1,
        "horizontal-overflow",
        label,
        f"delta={metrics['delta']}px offenders={metrics['offenders']}",
    )


def check_visible(page: Page, audit: Audit, label: str, name: str, selector: str) -> None:
    locator = page.locator(selector)
    count = locator.count()
    audit.check(count > 0, "structure", label, f"missing {name} ({selector})")
    if count:
        audit.check(locator.first.is_visible(), "visibility", label, f"hidden {name} ({selector})")


def audit_home(
    page: Page,
    audit: Audit,
    label: str,
    viewport_name: str,
    language: str,
    theme: str,
) -> None:
    status, broken = load(page, "/")
    audit.check(status == 200, "http", label, f"home status={status}")
    audit_basics(page, audit, label, language, theme, broken)

    structures = (
        ("main", "main#main"),
        ("hero", "#top.hero"),
        ("about", "#about.about"),
        ("experience", "#experience.experience"),
        ("timeline", "#experience .journey-list"),
        ("work", "#work.selected-work"),
        ("featured work", "#work .featured-work-grid"),
        ("compact work", "#work .compact-work"),
        ("skills", "#skills.skills"),
        ("contact", "#contact.contact"),
    )
    for name, selector in structures:
        check_visible(page, audit, label, name, selector)

    audit.check(page.locator(".journey-item .journey-row").count() == 4, "timeline", label, "expected 4 timeline rows")
    audit.check(page.locator(".featured-project.project-feature").count() == 2, "work", label, "expected 2 featured projects")
    audit.check(page.locator(".compact-project.project-feature").count() == 3, "work", label, "expected 3 compact projects")
    audit.check(page.locator(".marquee-row").count() == 2, "skills", label, "expected 2 marquee rows")

    hrefs = set(page.locator("#work a[href^='/work/']").evaluate_all("links => links.map(link => link.getAttribute('href'))"))
    expected_hrefs = {f"/work/{slug}" for slug in PROJECTS}
    audit.check(expected_hrefs.issubset(hrefs), "project-links", label, f"missing={sorted(expected_hrefs - hrefs)}")
    audit.check(page.locator("a[href*='linkedin.com']").count() >= 1, "linkedin", label, "expected at least one LinkedIn link")
    audit.check(page.locator("a[href*='github.com']").count() >= 1, "github", label, "expected at least one GitHub link")
    audit.check(page.locator("a[href^='mailto:']").count() >= 1, "email", label, "expected at least one email link")

    if viewport_name == "mobile":
        button = page.locator(".menu-button")
        audit.check(button.is_visible(), "mobile-menu", label, "menu button is hidden")
        audit.check(not page.locator(".desktop-nav").is_visible(), "mobile-menu", label, "desktop nav is visible")
        button.click()
        page.locator("#mobile-menu").wait_for(state="visible")
        audit.check(button.get_attribute("aria-expanded") == "true", "mobile-menu", label, "aria-expanded did not become true")
        audit.check(page.locator("#mobile-menu a").count() == 5, "mobile-menu", label, "expected 5 menu links")
        audit.check(page.locator("body").evaluate("body => body.classList.contains('menu-open')"), "mobile-menu", label, "body is not locked")
        menu_colors = page.evaluate(
            """
            () => ({
              mark: getComputedStyle(document.querySelector('.monogram span:first-child')).color,
              menu: getComputedStyle(document.querySelector('#mobile-menu')).backgroundColor,
            })
            """
        )
        audit.check(menu_colors["mark"] != menu_colors["menu"], "mobile-menu-contrast", label, "W monogram matches menu background")
        menu_overflow = overflow_metrics(page)
        audit.check(menu_overflow["delta"] <= 1, "horizontal-overflow", f"{label}/menu", f"delta={menu_overflow['delta']}px")
        page.keyboard.press("Escape")
        page.wait_for_function("document.querySelector('.menu-button')?.getAttribute('aria-expanded') === 'false'")
        audit.check(not page.locator("body").evaluate("body => body.classList.contains('menu-open')"), "mobile-menu", label, "body remained locked")
        audit.stats["mobile_menu"] += 1
    else:
        audit.check(page.locator(".desktop-nav").is_visible(), "desktop-nav", label, "desktop nav is hidden")
        audit.check(not page.locator(".menu-button").is_visible(), "desktop-nav", label, "mobile button is visible")

    audit.stats["home"] += 1


def audit_case(
    page: Page,
    audit: Audit,
    label: str,
    slug: str,
    language: str,
    theme: str,
) -> None:
    status, broken = load(page, f"/work/{slug}")
    audit.check(status == 200, "http", label, f"status={status}")
    audit_basics(page, audit, label, language, theme, broken)
    checks = (
        ("case root", f"main.case-study.case-{slug}"),
        ("case hero", ".case-hero h1"),
        ("lead image", ".case-lead-image img"),
        ("overview", ".case-overview"),
        ("challenge/solution", ".case-two-up"),
        ("gallery", ".case-gallery"),
        ("lists", ".case-lists"),
        ("stack", ".case-stack"),
        ("next project", ".next-project"),
    )
    for name, selector in checks:
        check_visible(page, audit, label, name, selector)
    audit.check(page.locator(".case-gallery img").count() == 2, "case-gallery", label, "expected 2 gallery images")
    audit.check(page.locator(".case-study img").count() == 3, "case-images", label, "expected 3 project images")
    title = page.locator(".case-hero h1").inner_text().strip() if page.locator(".case-hero h1").count() else ""
    audit.check(bool(title), "case-title", label, "empty case title")
    audit.stats["case"] += 1


def spatial_transition_ms(page: Page, selector: str, pseudo: str | None = None) -> float | None:
    locator = page.locator(selector).first
    if locator.count() == 0:
        return None
    return locator.evaluate(
        """
        (element, pseudo) => {
          const style = getComputedStyle(element, pseudo || null);
          const properties = style.transitionProperty.split(',').map((item) => item.trim());
          const durations = style.transitionDuration.split(',').map(toMs);
          const delays = style.transitionDelay.split(',').map(toMs);
          const motion = new Set([
            'all', 'transform', 'translate', 'rotate', 'scale', 'opacity', 'clip-path',
            'top', 'right', 'bottom', 'left', 'inset', 'margin', 'margin-left',
            'margin-right', 'padding', 'padding-left', 'padding-right', 'width', 'height'
          ]);
          let longest = 0;
          properties.forEach((property, index) => {
            if (!motion.has(property)) return;
            longest = Math.max(longest, durations[index % durations.length] + delays[index % delays.length]);
          });
          return longest;

          function toMs(value) {
            const number = parseFloat(value) || 0;
            return value.trim().endsWith('ms') ? number : number * 1000;
          }
        }
        """,
        pseudo,
    )


def active_motion(page: Page, selector: str | None = None) -> list[str]:
    return page.evaluate(
        """
        (selector) => {
          const root = selector ? document.querySelector(selector) : document;
          if (!root) return [];
          const animations = root === document
            ? document.getAnimations()
            : root.getAnimations({ subtree: true });
          const spatial = new Set([
            'transform', 'translate', 'rotate', 'scale', 'opacity', 'clip-path',
            'top', 'right', 'bottom', 'left', 'inset', 'margin', 'margin-left',
            'margin-right', 'padding', 'padding-left', 'padding-right', 'width', 'height'
          ]);
          return animations.filter((animation) => {
            const timing = animation.effect?.getComputedTiming?.();
            const duration = Number(timing?.activeDuration || 0);
            if (animation.playState !== 'running' || duration <= 16) return false;
            if (animation.constructor.name === 'CSSTransition') {
              return spatial.has(animation.transitionProperty);
            }
            return true;
          }).map((animation) => animation.constructor.name + ':' + (animation.animationName || animation.transitionProperty || 'motion'));
        }
        """,
        selector,
    )


def audit_reduced_motion(browser: Browser, audit: Audit) -> None:
    context = new_context(browser, "desktop", "en", "light", reduced_motion="reduce")
    page = context.new_page()
    current = {"label": "reduced-motion/home"}
    attach_errors(page, audit, current)
    try:
        _, broken = load(page, "/")
        audit.check(not broken, "broken-image", current["label"], ", ".join(broken[:3]))
        audit.check(
            page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"),
            "reduced-motion",
            current["label"],
            "media query does not match",
        )

        tracks = page.locator(".marquee-track").evaluate_all(
            """
            tracks => tracks.map((track) => {
              const style = getComputedStyle(track);
              return { state: style.animationPlayState, transform: style.transform };
            })
            """
        )
        identity = {"none", "matrix(1, 0, 0, 1, 0, 0)"}
        audit.check(len(tracks) == 2 and all(item["state"] == "paused" for item in tracks), "reduced-motion", current["label"], f"marquee={tracks}")
        audit.check(all(item["transform"] in identity for item in tracks), "reduced-motion", current["label"], f"marquee transforms={tracks}")

        reveal_selectors = (
            ".about-heading-wrap",
            ".journey-item > div",
            ".project-preview-reveal",
            ".compact-project-reveal",
            ".skills-title",
            ".contact-top > div",
        )
        for selector in reveal_selectors:
            values = page.locator(selector).evaluate_all("els => els.map(el => Number(getComputedStyle(el).opacity))")
            audit.check(bool(values) and all(value > 0.99 for value in values), "reduced-motion", current["label"], f"hidden reveal {selector}: {values}")

        probes = (
            ("hero arrow", ".primary-link span", None),
            ("CV arrow", ".cv-nav span", None),
            ("featured number", ".featured-project .project-topline span:first-child", None),
            ("featured cover", ".featured-project .project-cover", None),
            ("featured underline", ".featured-project .case-link", "::after"),
            ("featured arrow", ".featured-project .case-link span", None),
            ("compact number", ".compact-project-number", None),
            ("compact image", ".compact-project-image img", None),
            ("compact arrow", ".compact-project-arrow", None),
            ("skill icon", ".marquee-track i", None),
            ("contact row", ".contact-links a", None),
            ("contact arrow", ".contact-links i", None),
        )
        for name, selector, pseudo in probes:
            duration = spatial_transition_ms(page, selector, pseudo)
            audit.check(duration is not None, "reduced-motion-probe", current["label"], f"missing {name} ({selector})")
            if duration is not None:
                audit.check(duration <= 16, "reduced-motion-transition", current["label"], f"{name}={duration:g}ms")

        hover_targets = (
            ("hero link", ".primary-link"),
            ("CV link", ".cv-nav"),
            ("featured project", ".featured-project"),
            ("featured link", ".featured-project .case-link"),
            ("compact project", ".compact-project-link"),
            ("skill", ".marquee-row span"),
            ("contact", ".contact-links a"),
        )
        for name, selector in hover_targets:
            target = page.locator(selector).first
            if target.count() and target.is_visible():
                target.hover()
                page.wait_for_timeout(24)
                running = active_motion(page, selector)
                audit.check(not running, "reduced-motion-active", current["label"], f"{name}: {running}")

        page.evaluate("document.querySelector('#about').scrollIntoView()")
        page.wait_for_function(
            "document.querySelector(\".desktop-nav a[href='/#about']\")?.getAttribute('aria-current') === 'location'"
        )
        page.evaluate("document.querySelector('#experience').scrollIntoView()")
        page.wait_for_function(
            "document.querySelector(\".desktop-nav a[href='/#experience']\")?.getAttribute('aria-current') === 'location'"
        )
        page.wait_for_timeout(24)
        indicator_early = page.locator(".nav-active-indicator").evaluate("el => getComputedStyle(el).transform") if page.locator(".nav-active-indicator").count() else "missing"
        page.wait_for_timeout(420)
        indicator_late = page.locator(".nav-active-indicator").evaluate("el => getComputedStyle(el).transform") if page.locator(".nav-active-indicator").count() else "missing"
        normalized_early = "identity" if indicator_early in identity else indicator_early
        normalized_late = "identity" if indicator_late in identity else indicator_late
        audit.check(normalized_early == normalized_late, "reduced-motion-layout", current["label"], f"nav indicator {indicator_early} -> {indicator_late}")

        current["label"] = "reduced-motion/case"
        load(page, "/work/helpdesk")
        duration = spatial_transition_ms(page, ".next-project i")
        audit.check(duration is not None and duration <= 16, "reduced-motion-transition", current["label"], f"next project={duration}ms")
        page.locator(".next-project").hover()
        page.wait_for_timeout(24)
        audit.check(not active_motion(page, ".next-project"), "reduced-motion-active", current["label"], "next-project transition is running")
        audit.check(not active_motion(page), "reduced-motion-active", current["label"], "long-running page animation")
        audit.stats["reduced_motion"] += 1
    except Exception as error:
        audit.fail("runtime", current["label"], repr(error))
    finally:
        page.close()
        context.close()


def audit_controls(browser: Browser, audit: Audit) -> None:
    context = new_context(browser, "desktop", "en", "light")
    page = context.new_page()
    current = {"label": "controls"}
    attach_errors(page, audit, current)
    try:
        load(page, "/")
        before = page.locator(".header-utilities").bounding_box()
        page.locator(".language-toggle").click()
        page.wait_for_function("document.documentElement.lang === 'ar' && document.documentElement.dir === 'rtl'")
        after = page.locator(".header-utilities").bounding_box()
        if before and after:
            audit.check(abs(before["width"] - after["width"]) <= 1, "language-layout", current["label"], f"utility width {before['width']} -> {after['width']}")
        page.locator(".icon-button").click()
        page.wait_for_function("document.documentElement.dataset.theme === 'dark'")
        audit.check(overflow_metrics(page)["delta"] <= 1, "horizontal-overflow", current["label"], "overflow after toggles")
        audit.stats["controls"] += 1
    except Exception as error:
        audit.fail("runtime", current["label"], repr(error))
    finally:
        page.close()
        context.close()


def audit_matrix(browser: Browser, audit: Audit) -> None:
    for viewport_name in VIEWPORTS:
        for language, theme in COMBINATIONS:
            base_label = f"{viewport_name}/{language}/{theme}"
            context = new_context(browser, viewport_name, language, theme)
            page = context.new_page()
            current = {"label": f"{base_label}/home"}
            attach_errors(page, audit, current)
            try:
                audit_home(page, audit, current["label"], viewport_name, language, theme)
            except Exception as error:
                audit.fail("runtime", current["label"], repr(error))

            for slug in PROJECTS:
                current["label"] = f"{base_label}/work/{slug}"
                try:
                    audit_case(page, audit, current["label"], slug, language, theme)
                except Exception as error:
                    audit.fail("runtime", current["label"], repr(error))

            page.close()
            context.close()


def main() -> int:
    audit = Audit()
    try:
        with sync_playwright() as playwright:
            launch_options = {"headless": True}
            if CHROME.exists():
                launch_options["executable_path"] = str(CHROME)
            browser = playwright.chromium.launch(**launch_options)

            request = playwright.request.new_context(base_url=URL)
            try:
                response = request.get("/Waleed_Alharbi_CV.pdf")
                audit.check(response.status == 200, "cv", "asset", f"status={response.status}")
            except Exception as error:
                audit.fail("cv", "asset", repr(error))
            finally:
                request.dispose()

            audit_matrix(browser, audit)
            audit_controls(browser, audit)
            audit_reduced_motion(browser, audit)
            browser.close()
    except Exception as error:
        audit.fail("fatal", "runner", repr(error))
    return audit.report()


if __name__ == "__main__":
    sys.exit(main())
