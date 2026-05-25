# alexander-maasik-site

Personal site for **Alexander Maasik**, built on Yext Pages (PagesJS). Bilingual EN + ET. Conversion-focused around the mailto CTA `alexander.maasik@nobeldigital.ee`.

This repo matches the established **Sendoplex Yext Pages pattern**: single `location` entity, custom fields defined in a sibling repo, UI strings in `src/i18n/`, build configured for Yext's GitHub-based deploy.

Companion repo: [`alexander-maasik-config`](https://github.com/flyinghighindustries/alexander-maasik-config) — Yext Knowledge Graph custom-field config-as-code, pulled by Yext from GitHub.

## Stack

- React 18 + TypeScript
- Tailwind CSS (minimal palette: paper / ink / single navy accent)
- Vite for local preview · Yext Pages build for production
- Node **18** (pinned in `.nvmrc`)
- Single `location` entity → one template (`src/templates/location.tsx`) → `index.html` (EN) + `et/index.html`

## Sections (single scroll, conversion-focused)

1. **Hero** — tagline + primary `mailto:` CTA above the fold
2. **Services** — 3 cards, each with a prefilled email subject
3. **About** — bio + photo
4. **Approach** — 3 principles, inverted dark block
5. **Work** — anonymised case studies with numeric outcomes
6. **CTA** — full-width close
7. **Footer** — socials + email

Every action lands on `alexander.maasik@nobeldigital.ee`.

## Local development

```bash
nvm use            # Node 18, per .nvmrc
npm install
npm run dev        # plain Vite, uses localData/ fixtures — no Yext account required
```

- **English** → http://localhost:5173/
- **Estonian** → http://localhost:5173/?lang=et

## Photos

Place two photos at `static/assets/`:

- `alexander-portrait.jpg` — hero (4:5)
- `alexander-casual.jpg` — about (1:1)

See [`static/assets/README.md`](static/assets/README.md) for sizes. In production these are replaced with Yext-hosted URLs after upload to the `c_heroPortrait` / `c_aboutPhoto` entity fields.

## Wiring to Yext (production)

1. **Apply the config repo first** — see [`alexander-maasik-config/RUNBOOK.md`](https://github.com/flyinghighindustries/alexander-maasik-config/blob/main/RUNBOOK.md). That creates the 15 custom fields and the Alexander Maasik location entity.
2. Note the numeric entity ID returned by the POST.
3. In Yext UI: **Pages → Sites → New Site → Connect Git Repo → `flyinghighindustries/alexander-maasik-site`**, branch `main`, build config file `config.yaml`.
4. Set environment variables on the site:
   - `YEXT_PUBLIC_LOCATION_ENTITY_ID` = the numeric id from step 2
   - `YEXT_PUBLIC_LOCATION_LOCALE_CODE` = `en,et`
5. Trigger a deploy. Yext builds via `npm install && npm run build` and serves the `dist/` artifact.

## Project layout

```
alexander-maasik-site/
├── .nvmrc                          # Node 18
├── config.yaml                     # Yext Pages build config
├── sites-config/ci.json            # Yext build-artifact config
├── localData/                      # EN + ET preview fixtures
├── static/assets/                  # photos (drop in locally; replaced by Yext-hosted in prod)
├── public/
├── index.html                      # Vite local-preview entry
└── src/
    ├── main.tsx                    # Vite preview bootstrap (reads ?lang= from URL)
    ├── templates/location.tsx      # Yext Pages template — runs once per locale
    ├── components/                 # Header, Hero, Services, About, Approach, Work, CTA, Footer
    ├── i18n/                       # EN + ET UI chrome strings (NOT in Yext, per Sendoplex pattern)
    ├── types/entity.ts             # Entity shape + zipParallel() helper for parallel-list fields
    └── index.css                   # Tailwind base + components
```

## Why parallel-list fields, not structs

Yext struct fields aren't available in every account tier. The Sendoplex pattern uses parallel string lists (e.g. `c_serviceTitles`, `c_serviceBodies`, `c_serviceEmailSubjects`) and zips them at render time via `zipParallel()` in [`src/types/entity.ts`](src/types/entity.ts). The trade-off: list lengths must stay in sync when editing in Yext — the helper guards against mismatches but a missing element will render blank.
