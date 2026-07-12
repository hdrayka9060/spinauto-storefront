# Spin Auto Ltd — Storefront

A pixel-accurate recreation of the public [spinauto.ca](https://spinauto.ca/) dealership website, built as a **standalone** front-end app. It is part of the wider CDMS ecosystem (sibling to `cdms-backend` and the `spark-auto-suite` admin app) but ships independently.

- **Status:** Phase 1 (visual clone) complete — all pages, responsive desktop + mobile, dummy data.
- **Next:** Phase 2 — wire inventory to the CDMS backend and route form submissions into the `leads` collection.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (dark theme, design tokens in `tailwind.config.ts`)
- **react-router-dom** (routing)
- **embla-carousel-react** (hero carousel)
- **lucide-react** (icons)
- Fonts: **Play** (headings) + **Roboto** (body), loaded via Google Fonts
- `react-hook-form` + `zod` are installed for Phase-2 form validation (forms currently use native HTML5 validation)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5175
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on port **5175** |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build |

## Project structure

```
src/
  App.tsx                 # Routes
  main.tsx                # Entry (BrowserRouter)
  index.css               # Tailwind + base styles + component classes
  components/
    layout/               # SiteShell, SiteHeader (nav + mobile drawer), Footer
    home/                 # HeroSection, HeroCarousel, InventorySearch, FeatureTiles, WelcomeBand, FinancingCTA, LocationBand
    inventory/            # VehicleCard, FilterGroups
    forms/                # FormPageLayout, ContactSidebar, fields (Field/TextInput/SelectInput/…)
  pages/
    Home.tsx  Inventory.tsx  VehicleDetail.tsx
    Service.tsx  About.tsx  Directions.tsx  Privacy.tsx
    forms/                # FinanceApplication, CarFinder, BookAppointment
  data/
    site.ts               # Business info (name, address, phone, hours, map embed)
    vehicles.ts           # Dummy inventory (shape mirrors CDMS Vehicle contract)
    form-options.ts       # Select options (provinces, employment, etc.)
  lib/
    seo.ts                # useRouteSeo() — per-route <title>/description/OG tags
    utils.ts              # cn() helper
public/assets/            # Logo, hero slides, tile images (captured from live site)
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/cars` | Inventory (filter + sort) |
| `/cars/:id` | Vehicle detail |
| `/finance`, `/forms/financing` | Finance application |
| `/forms/car-finder` | Car finder |
| `/forms/book-appointment` | Book appointment |
| `/service` | Book service appointment |
| `/about-us` | About us |
| `/directions` | Directions + map |
| `/privacy` | Privacy & policy |

## Design tokens

| Token | Value | Usage |
|---|---|---|
| `bg` | `#222222` | Page background |
| black | `#000` | Header / nav / footer |
| `brand-red` | `#DB2526` | Active nav, primary CTAs |
| `brand-red-dark` | `#B41A1A` | Secondary / hover |
| text | `#E8E8E8` | Body text (headings white) |

## Notes

- **Dummy data:** inventory lives in `src/data/vehicles.ts`; vehicle photos are placeholders until the backend feed is wired (Phase 2 → `/api/v1/website/inventory`).
- **Forms:** submit to a local success state only; Phase 2 will POST to the CDMS `leads` collection.
- **Design reference:** the full capture of the live site (layouts, copy, form fields, assets) lives in `../docs/spinauto-clone/design-reference.md`.
