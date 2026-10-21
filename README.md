# SET 2027 · Seismology for the Energy Transition

Website for the SET 2027 workshop, 12–14 May 2027, Delft University of Technology.
Live at https://davidn182.github.io/Seismology-for-the-Energy-Transition/

## Structure

Plain HTML and CSS, served by GitHub Pages from `main`. No build tools needed.

| File | Page |
|---|---|
| `index.html` | Home |
| `programme.html` | Draft programme, one section per day |
| `register.html` | Registration, abstracts, travel grants, key dates |
| `venue.html` | Venue, travel, accommodation |
| `sponsors.html` | Sponsor information |
| `people.html` | Organising committee |
| `code-of-conduct.html` | Code of conduct |
| `assets/css/style.css` | All styles (colours and fonts at the top) |
| `assets/js/site.js` | Draws the Delft skyline in the header |
| `partials/` | Shared head, header and footer |

## Editing

- **Page content:** edit the page file directly, between `<main>` and `</main>`.
- **Header, menu or footer:** edit the file in `partials/`, then run `python3 tools/build.py`. It copies the shared blocks into every page and marks the current menu item.
- **Adding a page:** copy an existing page, change its content and title, add it to `NAV` in `tools/build.py`, and run the script.

## Image credits

- Delft street: photo by [Who’s Denilo?](https://unsplash.com/photos/no-people-at-the-pathway-towards-white-concrete-church-aU9eXkfVxqw) on Unsplash (Unsplash licence).
- DAPwell illustration: Studio Stephan Timmers, via Bruhn et al. (2026), *Scientific Drilling* 35, 83–97, https://doi.org/10.5194/sd-35-83-2026, CC BY 4.0.
- SSA logo: Seismological Society of America, used as sponsor acknowledgement.
