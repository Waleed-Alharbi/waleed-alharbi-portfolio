from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets" / "personal"


def web_variants(source_name: str, stem: str, widths: tuple[int, ...]) -> None:
    with Image.open(ASSETS / source_name) as source:
        image = source.convert("RGB")
        for width in widths:
            ratio = min(1, width / image.width)
            size = (round(image.width * ratio), round(image.height * ratio))
            variant = image if size == image.size else image.resize(size, Image.Resampling.LANCZOS)
            variant.save(ASSETS / f"{stem}-{size[0]}.webp", "WEBP", quality=90, method=6)


web_variants("portrait.png", "portrait", (900, 1254))
web_variants("hackathon-award.png", "hackathon-award", (850, 1150))
