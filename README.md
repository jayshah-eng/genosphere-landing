# GenoSphere landing page

Interactive prototype of a rebuilt Helix GenoSphere landing page.

**Live site:** https://jayshah-eng.github.io/genosphere-landing/

## What's here

- `index.html` — page markup
- `styles.css` — all styles (official Helix palette, Merriweather + Mulish)
- `app.js` — the interactive logic (therapeutic-area web map, drawers, animations)
- `Explorer-Demo-Summit.mp4` — Explorer demo video (see note below)

## The map

A radial "web" of the therapeutic-area landscape: GenoSphere at the hub, six therapeutic areas around it, each opening to its specialties and then to individual conditions on a clean fan. Click a condition for a one-line description, participant count, and any linked pathogenic-variant genomics. There is also a ranked list view, search, zoom/pan, a node-size legend, and a tutorial.

## Data

Condition counts come from the HRN Therapeutic Areas Cohort export (12 Oct 2026, HRN-enrolled records, excluding Anuva). Gene carrier figures come from the Helix GenoSphere connector (as of 15 May 2026). All counts are participants with the condition in linked records.

## Setup notes

1. **Enable GitHub Pages:** Settings → Pages → Build and deployment → Deploy from a branch → `main` / `root`.
2. **Explorer video:** the ~10 MB `Explorer-Demo-Summit.mp4` could not be pushed through the API. Add it to the repo root (drag-and-drop in the GitHub UI, or `git add` locally) so the Explorer section's player works. The page already references it by that filename.

_Prototype for internal review. Figures and copy are not final._
