#!/usr/bin/env python3
"""Copy the shared head, header and footer from partials/ into every page.

Edit partials/*.html, then run:  python3 tools/build.py
Each page keeps its own content between the markers; only the marked blocks are replaced.
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = [
    ("programme.html", "Programme"),
    ("register.html", "Register & abstracts"),
    ("venue.html", "Venue & travel"),
    ("sponsors.html", "Sponsors"),
    ("people.html", "People"),
]
BLOCKS = ["HEAD", "HEADER", "FOOTER"]


def nav_html(page):
    out = []
    for href, label in NAV:
        cur = ' aria-current="page"' if href == page else ""
        out.append(f'<a class="link" href="{href}"{cur}>{label.replace("&", "&amp;")}</a>')
    return "\n  ".join(out)


def main():
    parts = {b: (ROOT / "partials" / f"{b.lower()}.html").read_text().strip() for b in BLOCKS}
    for page in sorted(ROOT.glob("*.html")):
        text = page.read_text()
        for b in BLOCKS:
            block = parts[b].replace("{{NAV}}", nav_html(page.name))
            pat = re.compile(rf"(<!-- {b}:START -->)(.*?)(<!-- {b}:END -->)", re.S)
            if not pat.search(text):
                print(f"skip {b} in {page.name}: no markers")
                continue
            text = pat.sub(lambda m: f"{m.group(1)}\n{block}\n{m.group(3)}", text)
        page.write_text(text)
        print("built", page.name)


if __name__ == "__main__":
    main()
