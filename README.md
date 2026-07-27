# Spin Auto Ltd — Storefront

A pixel-accurate, **backend-integrated** recreation of the public [spinauto.ca](https://spinauto.ca/) dealership website. Standalone front-end (Vite + React + TS + Tailwind) that consumes the existing NestJS **`cdms-backend`**. Desktop + mobile, dark theme.

> **Status:** Phases 0–2 complete and verified — full visual clone, live inventory, working lead capture, comparison, faceted filtering, finance calculator.
> **📄 For a full status + how-to-continue guide, read [`../docs/spinauto-clone/HANDOFF.md`](../docs/spinauto-clone/HANDOFF.md).**

## Getting started

Run the backend and the storefront together:

```bash
# 1) Backend (NestJS) — port 3000
cd ../cdms-backend && npm run start:dev

# 2) Storefront — port 5175
npm install       # first time only
npm run dev       # http://localhost:5175
```

Config: `.env` → `VITE_API_BASE_URL=http://localhost:3000/api/v1`. If the backend is unreachable, the site falls back to bundled sample inventory (`src/data/vehicles.ts`).

### Scripts
| Command | Description |
|---|---|
| `npm run dev` | Vite dev server on port **5175** |
| `npm run build` | Type-check + build to `dist/` |
| `npm run preview` | Preview the production build |

## Tech stack

Vite · React 18 · TypeScript · Tailwind (tokens in `tailwind.config.ts`) · react-router-dom · embla-carousel · lucide-react · fonts **Play** (headings) + **Roboto** (body). No component library — plain components + Tailwind.

## Backend integration

- **Inventory:** `GET /api/v1/website/inventory` (returns `unsold` + `sold` vehicles) and `/website/inventory/:id`. Mapped in `src/lib/vehicle-mapper.ts` (`company`→make, `km`→mileage, `vehicleNumber`→stock, `bodyType`→bodyStyle, `color`→exteriorColor, `photos[]`→images).
- **Leads:** every form POSTs to `POST /api/v1/website/inquiry` (public endpoint added to the backend) → creates a CRM BuyerLead + `source: website` Lead, linked to a vehicle when one is selected.
- See the HANDOFF doc for the exact list of `cdms-backend` changes (new endpoint, schema fields, CORS, cleanup script).

## Project structure

```
src/
  App.tsx                 # Routes (+ CompareProvider)
  components/
    layout/               # SiteShell, SiteHeader (nav + drawer), Footer, Logo
    home/                 # HeroSection, HeroCarousel, InventorySearch, FeatureTiles, WelcomeBand, FinancingCTA, LocationBand
    inventory/            # VehicleCard, FilterGroups, CompareBar
    forms/                # FormPageLayout, ContactSidebar, fields, VehiclePicker
  pages/
    Home, Inventory, VehicleDetail, Compare, FinanceDepartment, About, Directions, Privacy, Service
    forms/                # FinanceApplication, FinanceCalculator, CarFinder, BookAppointment, ContactUs, TextUsNow
  hooks/                  # use-inventory, use-inquiry
  lib/                    # api, vehicle-mapper, inquiry, compare-context, seo, utils
  data/                   # site (business info + nav), vehicles (fallback), form-options
```

## Routes

`/` · `/cars` · `/cars/:id` · `/compare` · `/finance` · `/forms/financing` · `/forms/finance-calculator` · `/forms/car-finder` · `/forms/book-appointment` · `/forms/contact-us` · `/forms/text-us-now` · `/service` · `/about-us` · `/directions` · `/privacy`

## Design tokens

| Token | Value | Usage |
|---|---|---|
| `bg` | `#222222` | Page background |
| black | `#000` | Header / nav / footer |
| `brand-red` | `#DB2526` | Active nav, primary CTAs, SOLD ribbon |
| `brand-red-dark` | `#B41A1A` | Secondary / hover |
| text | `#E8E8E8` | Body (headings white) |

## Reference

- Original-site capture (layouts, copy, form fields, assets): [`../docs/spinauto-clone/design-reference.md`](../docs/spinauto-clone/design-reference.md)
- Status + continue-here guide: [`../docs/spinauto-clone/HANDOFF.md`](../docs/spinauto-clone/HANDOFF.md)
