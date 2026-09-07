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
            f"intro_sessions={self.stats['intro_session']} "
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
            sessionStorage.setItem('waleed-intro-seen', 'skip');
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

    audit.check(page.locator(".journey-item .journey-row").count() == 5, "timeline", label, "expected 5 timeline rows")
    audit.check(page.locator(".featured-project.project-feature").count() == 2, "work", label, "expected 2 featured projects")
    audit.check(page.locator(".compact-project.project-feature").count() == 3, "work", label, "expected 3 compact projects")
    audit.check(page.locator(".skill-category").count() == 4, "skills", label, "expected 4 categorized skill lanes")
    audit.check(page.locator(".marquee-row").count() == 4, "skills", label, "expected 4 marquee rows")
    audit.check(page.locator(".project-github-link").count() == 7, "project-actions", label, "expected 7 GitHub buttons")
    audit.check(page.locator(".project-details-button").count() == 6, "project-actions", label, "expected 6 details buttons")
    audit.check(page.locator("a[href*='linkedin.com']").count() >= 1, "linkedin", label, "expected at least one LinkedIn link")
    audit.check(page.locator("a[href*='github.com']").count() >= 1, "github", label, "expected at least one GitHub link")
    audit.check(page.locator("a[href^='mailto:']").count() >= 1, "email", label, "expected at least one email link")
    audit.check("waleed_harbi@outlook.com" not in page.locator("body").inner_text(), "email", label, "full email is visible")
    audit.check(page.locator(".contact-link-icon").count() == 4, "contact-icons", label, "expected vector icons for Email, GitHub, LinkedIn and CV")
    audit.check(page.locator(".contact-file-emoji").count() == 0, "contact-icons", label, "legacy CV emoji is still present")
    audit.check(page.locator(".marquee-group").count() == 8, "skills-loop", label, "expected two identical loop groups per skill lane")
    hero_video = page.locator(".hero-video")
    audit.check(hero_video.count() == 1, "hero-video", label, "expected one native Hero video")
    audit.check(page.locator(".hero-atmosphere, .hero-galaxy, .hero-star-field").count() == 0, "hero-video", label, "legacy synthetic space layers are still present")
    if hero_video.count():
        video_config = hero_video.evaluate(
            "video => ({ src: video.currentSrc, autoplay: video.autoplay, muted: video.muted, loop: video.loop, playsInline: video.playsInline, preload: video.preload })"
        )
        reduced_motion = page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
        if reduced_motion:
            audit.check(video_config["src"] == "", "hero-video", label, f"reduced-motion src={video_config['src']}")
            audit.check(
                not video_config["autoplay"] and video_config["muted"] and video_config["loop"] and video_config["playsInline"] and video_config["preload"] == "none",
                "hero-video",
                label,
                f"reduced-motion config={video_config}",
            )
        else:
            audit.check(video_config["src"].endswith("/videos/hero-space.mp4"), "hero-video", label, f"src={video_config['src']}")
            audit.check(
                video_config["autoplay"] and video_config["muted"] and video_config["loop"] and video_config["playsInline"] and video_config["preload"] == "metadata",
                "hero-video",
                label,
                f"config={video_config}",
            )
    idea_link = page.locator(".contact-idea")
    audit.check(idea_link.count() == 1, "contact-idea", label, "suggest-an-idea button is missing")
    if idea_link.count():
        idea_href = idea_link.get_attribute("href") or ""
        audit.check(idea_href.startswith("mailto:") and "subject=" in idea_href, "contact-idea", label, f"invalid href={idea_href}")
        idea_box = idea_link.bounding_box()
        audit.check(bool(idea_box) and idea_box["height"] >= 60, "contact-idea", label, f"button box={idea_box}")

    contact_spacing = page.evaluate(
        """
        () => {
          const lines = Array.from(document.querySelectorAll('.contact h2 > span')).map((line) => line.getBoundingClientRect());
          const idea = document.querySelector('.contact-idea').getBoundingClientRect();
          const links = document.querySelector('.contact-links').getBoundingClientRect();
          return {
            lineGaps: lines.slice(1).map((line, index) => line.top - lines[index].bottom),
            afterIdea: links.top - idea.bottom,
          };
        }
        """
    )
    audit.check(all(gap >= 4 for gap in contact_spacing["lineGaps"]), "contact-spacing", label, f"line gaps={contact_spacing['lineGaps']}")
    audit.check(contact_spacing["afterIdea"] >= 18, "contact-spacing", label, f"after idea={contact_spacing['afterIdea']}px")

    work_text = page.locator(".work-intro").inner_text().lower()
    audit.check("products" not in work_text and "منتجات" not in work_text, "work-copy", label, "commercial product wording remains in work intro")
    work_gap = page.evaluate(
        """
        () => document.querySelector('.featured-work-grid').getBoundingClientRect().top
          - document.querySelector('.work-intro').getBoundingClientRect().bottom
        """
    )
    audit.check(work_gap <= 24, "work-spacing", label, f"intro-to-project gap={work_gap}px")

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
        audit.check(len(tracks) == 4 and all(item["state"] == "paused" for item in tracks), "reduced-motion", current["label"], f"marquee={tracks}")
        audit.check(all(item["transform"] in identity for item in tracks), "reduced-motion", current["label"], f"marquee transforms={tracks}")
        hero_video_display = page.locator(".hero-video").evaluate("video => getComputedStyle(video).display")
        audit.check(hero_video_display == "none", "reduced-motion", current["label"], f"hero video display={hero_video_display}")

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
            ("featured cover", ".featured-project .project-cover, .featured-project .project-card-poster", None),
            ("featured action", ".featured-project .project-action", None),
            ("compact number", ".compact-project-number", None),
            ("compact image", ".compact-project-image img", None),
            ("compact action", ".compact-project .project-action", None),
            ("skill icon", ".skill-icon", None),
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
            ("featured link", ".featured-project .project-action"),
            ("compact project", ".compact-project-link"),
            ("skill", ".marquee-row span"),
            ("contact", ".contact-links a"),
        )
        for name, selector in hover_targets:
            target = page.locator(selector).first
            if target.count() and target.is_visible():
                target.hover(force=True, timeout=5_000)
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


def audit_marquee_motion(browser: Browser, audit: Audit) -> None:
    for viewport_name in VIEWPORTS:
        for language in ("en", "ar"):
            label = f"marquee/{viewport_name}/{language}"
            context = new_context(
                browser,
                viewport_name,
                language,
                "light",
                reduced_motion="no-preference",
            )
            page = context.new_page()
            current = {"label": label}
            attach_errors(page, audit, current)
            try:
                _, broken = load(page, "/")
                audit.check(not broken, "broken-image", label, ", ".join(broken[:3]))
                audit.check(
                    not page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"),
                    "marquee-motion",
                    label,
                    "reduced-motion unexpectedly enabled",
                )

                tracks = page.locator(".marquee-track").evaluate_all(
                    r"""
                    tracks => tracks.map((track) => {
                      const groups = Array.from(track.querySelectorAll(':scope > .marquee-group'));
                      const style = getComputedStyle(track);
                      return {
                        animation: style.animationName,
                        duration: style.animationDuration,
                        delay: style.animationDelay,
                        iterations: style.animationIterationCount,
                        state: style.animationPlayState,
                        rowWidth: track.parentElement?.getBoundingClientRect().width || 0,
                        groupWidths: groups.map((group) => group.getBoundingClientRect().width),
                        groupText: groups.map((group) => group.textContent?.replace(/\s+/g, ' ').trim()),
                      };
                    })
                    """
                )
                audit.check(len(tracks) == 4, "marquee-motion", label, f"tracks={len(tracks)}")
                for index, track in enumerate(tracks):
                    widths = track["groupWidths"]
                    texts = track["groupText"]
                    audit.check(
                        track["animation"] in {"skill-marquee-forward", "skill-marquee-reverse"},
                        "marquee-motion",
                        label,
                        f"track {index} animation={track['animation']}",
                    )
                    audit.check(track["iterations"] == "infinite", "marquee-motion", label, f"track {index} iterations={track['iterations']}")
                    audit.check(track["state"] == "running", "marquee-motion", label, f"track {index} state={track['state']}")
                    audit.check(float(track["delay"].rstrip("s")) < 0, "marquee-motion", label, f"track {index} delay={track['delay']}")
                    audit.check(len(widths) == 2, "marquee-loop", label, f"track {index} groups={widths}")
                    if len(widths) == 2:
                        audit.check(abs(widths[0] - widths[1]) <= 1, "marquee-loop", label, f"track {index} unequal groups={widths}")
                        audit.check(widths[0] >= track["rowWidth"], "marquee-loop", label, f"track {index} group={widths[0]} row={track['rowWidth']}")
                    audit.check(len(texts) == 2 and texts[0] == texts[1], "marquee-loop", label, f"track {index} content mismatch")

                names = [track["animation"] for track in tracks]
                audit.check(all(names[index] != names[index + 1] for index in range(len(names) - 1)), "marquee-direction", label, f"directions={names}")

                hero_video = page.locator(".hero-video")
                page.wait_for_function("document.querySelector('.hero-video')?.readyState >= 2")
                video_before = hero_video.evaluate("video => video.currentTime")
                page.wait_for_timeout(280)
                video_after = hero_video.evaluate("video => video.currentTime")
                video_state = hero_video.evaluate("video => ({ paused: video.paused, muted: video.muted, loop: video.loop, readyState: video.readyState })")
                audit.check(not video_state["paused"] and video_state["muted"] and video_state["loop"], "hero-video", label, f"state={video_state}")
                audit.check(video_after > video_before, "hero-video", label, f"video did not advance: {video_before} -> {video_after}")

                before = page.locator(".marquee-track").evaluate_all("tracks => tracks.map(track => getComputedStyle(track).transform)")
                page.wait_for_timeout(240)
                after = page.locator(".marquee-track").evaluate_all("tracks => tracks.map(track => getComputedStyle(track).transform)")
                audit.check(before != after, "marquee-motion", label, f"tracks did not move: {before} -> {after}")

                coverage = page.locator(".marquee-row").evaluate_all(
                    """
                    rows => rows.map((row) => {
                      const track = row.querySelector('.marquee-track');
                      const animation = track.getAnimations().find((item) => item.effect);
                      const duration = Number(animation?.effect?.getTiming?.().duration || 0);
                      const originalTime = animation?.currentTime;
                      let worstGap = 0;
                      for (let step = 0; step < 12; step += 1) {
                        if (animation && duration) animation.currentTime = duration * step / 12;
                        void track.offsetWidth;
                        const rowRect = row.getBoundingClientRect();
                        const segments = Array.from(track.querySelectorAll('.skill-chip'))
                          .map((chip) => chip.getBoundingClientRect())
                          .filter((rect) => rect.right > rowRect.left && rect.left < rowRect.right)
                          .map((rect) => ({ left: Math.max(rect.left, rowRect.left), right: Math.min(rect.right, rowRect.right) }))
                          .sort((a, b) => a.left - b.left);
                        let cursor = rowRect.left;
                        for (const segment of segments) {
                          worstGap = Math.max(worstGap, segment.left - cursor);
                          cursor = Math.max(cursor, segment.right);
                        }
                        worstGap = Math.max(worstGap, rowRect.right - cursor);
                      }
                      if (animation) animation.currentTime = originalTime;
                      return { worstGap, rowWidth: row.getBoundingClientRect().width };
                    })
                    """
                )
                audit.check(
                    len(coverage) == 4 and all(item["worstGap"] <= 42 for item in coverage),
                    "marquee-coverage",
                    label,
                    f"coverage={coverage}",
                )

                visible_chip_index = page.locator(".skill-category:first-of-type .marquee-row").evaluate(
                    """
                    row => {
                      const rowRect = row.getBoundingClientRect();
                      return Array.from(row.querySelectorAll('.skill-chip')).findIndex((item) => {
                        const rect = item.getBoundingClientRect();
                        return rect.left >= rowRect.left && rect.right <= rowRect.right;
                      });
                    }
                    """
                )
                audit.check(visible_chip_index >= 0, "marquee-hover", label, "no fully visible skill chip")
                if visible_chip_index >= 0:
                    page.locator(".skill-category:first-of-type .skill-chip").nth(visible_chip_index).dispatch_event("pointerover")
                page.wait_for_timeout(24)
                paused = page.locator(".skill-category:first-of-type .marquee-track").evaluate(
                    "track => getComputedStyle(track).animationPlayState"
                )
                audit.check(paused == "paused", "marquee-hover", label, f"state={paused}")
                audit.check(overflow_metrics(page)["delta"] <= 1, "horizontal-overflow", label, "overflow while marquee is moving")
                audit.stats["marquee_motion"] += 1
            except Exception as error:
                audit.fail("runtime", label, repr(error))
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
        details_button = page.locator(".selected-work .project-details-button").first
        details_button.click()
        dialog = page.locator("#project-details-dialog")
        dialog.wait_for(state="visible")
        audit.check(dialog.get_attribute("open") is not None, "project-dialog", current["label"], "project dialog did not open modally")
        audit.check(dialog.locator(".project-dialog-summary").is_visible(), "project-dialog", current["label"], "project summary is hidden")
        audit.check(dialog.locator(".project-dialog-github svg").count() == 1, "project-dialog", current["label"], "GitHub icon missing in dialog")
        audit.check(dialog.locator("a[href^='/work/']").count() == 1, "project-dialog", current["label"], "full case-study link missing")
        page.keyboard.press("Escape")
        page.wait_for_function("!document.querySelector('#project-details-dialog')?.hasAttribute('open')")

        graduation_button = page.locator(".journey-project-actions .project-details-button")
        graduation_button.click()
        graduation_dialog = page.locator("#graduation-project-dialog")
        graduation_dialog.wait_for(state="visible")
        audit.check(graduation_dialog.get_attribute("open") is not None, "graduation-dialog", current["label"], "graduation dialog did not open modally")
        audit.check(graduation_dialog.locator(".project-dialog-summary").is_visible(), "graduation-dialog", current["label"], "graduation summary is hidden")
        graduation_repo = graduation_dialog.locator("a[href*='solar-energy-forecasting-system.git']")
        audit.check(graduation_repo.count() == 1, "graduation-dialog", current["label"], "graduation GitHub repository link missing")
        page.keyboard.press("Escape")
        page.wait_for_function("!document.querySelector('#graduation-project-dialog')?.hasAttribute('open')")

        award_button = page.locator(".journey-media-button")
        award_button.click()
        award_dialog = page.locator(".award-lightbox")
        award_dialog.wait_for(state="visible")
        audit.check(award_dialog.locator("img").is_visible(), "award-lightbox", current["label"], "enlarged award image is hidden")
        page.keyboard.press("Escape")
        page.wait_for_function("!document.querySelector('.award-lightbox')?.hasAttribute('open')")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)

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


def audit_intro_session(browser: Browser, audit: Audit) -> None:
    context = browser.new_context(
        viewport=VIEWPORTS["desktop"],
        color_scheme="dark",
        reduced_motion="no-preference",
    )
    context.add_init_script(
        """
        localStorage.setItem('waleed-language', 'en');
        localStorage.setItem('waleed-theme', 'dark');
        """
    )
    page = context.new_page()
    current = {"label": "intro/session"}
    attach_errors(page, audit, current)
    try:
        page.goto(URL, wait_until="networkidle")
        intro = page.locator(".portfolio-intro")
        audit.check(intro.count() == 1 and intro.is_visible(), "intro", current["label"], "intro did not appear on first visit")
        intro.wait_for(state="hidden", timeout=4_000)
        audit.check(
            page.evaluate("sessionStorage.getItem('waleed-intro-seen')") == "skip",
            "intro",
            current["label"],
            "intro session marker was not stored",
        )
        page.reload(wait_until="networkidle")
        audit.check(page.locator(".portfolio-intro").count() == 0, "intro", current["label"], "intro repeated in the same session")
        audit.stats["intro_session"] += 1
    except Exception as error:
        audit.fail("runtime", current["label"], repr(error))
    finally:
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
            audit_marquee_motion(browser, audit)
            audit_reduced_motion(browser, audit)
            audit_intro_session(browser, audit)
            browser.close()
    except Exception as error:
        audit.fail("fatal", "runner", repr(error))
    return audit.report()


if __name__ == "__main__":
    sys.exit(main())
