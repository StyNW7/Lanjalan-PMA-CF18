<div align="center">

<img src="public/Images/logo.png" alt="Lanjalan logo" width="96" />

# 💻 Lanjalan · Frontend Prototype

**An interactive Online Travel Agent prototype — from flight search to a full AI-planned itinerary.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-000000)](https://ui.shadcn.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?logo=framer&logoColor=white)](https://motion.dev)
[![Pages](https://img.shields.io/badge/pages-31-1B6CA8)](#-route-map)
[![Theme](https://img.shields.io/badge/theme-light%20%2B%20dark-2A9D8F)](#-design-system)

[Quick Start](#-quick-start) ·
[Architecture](#-architecture) ·
[Routes](#-route-map) ·
[Compass](#-lanjalan-compass) ·
[Design System](#-design-system) ·
[Deploy](#-deployment)

</div>

---

## 📌 Overview

A front-end-only prototype built to demonstrate two things at once:

1. **A credible end-to-end OTA experience** — search, compare, book flights, hotels, and activities.
2. **Lanjalan's differentiation** — the AIR framework, with **Lanjalan Compass** as the flagship feature.

Everything runs on typed mock data and browser storage. There is no backend, no API key, and no build
secret — clone, install, and the whole product is explorable in under a minute.

> Why these features exist, and the survey numbers behind them, are documented in
> [`../data-analysis/README.md`](../data-analysis/README.md).

---

## 🚀 Quick Start

**Requirements:** Node.js 18 or newer.

```bash
# from the repository root
cd frontend

npm install
npm run dev
```

Open **http://localhost:5173**.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check with `tsc -b`, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

> [!TIP]
> Try this path first: **Landing → Compass → Preferences → Generating → Trip Workspace**. It is the flow
> the whole case study is built around.

---

## 🧱 Architecture

```
frontend/
├── public/
│   └── Images/logo.png
├── src/
│   ├── pages/               # 31 route-level pages, grouped by feature
│   │   ├── Landing/  About/  Onboarding/
│   │   ├── Flights/         # Search → Results → Checkout
│   │   ├── Hotels/          # Search → Results → Detail
│   │   ├── Activities/      # Search → Results → Detail
│   │   ├── Compass/         # Intro → Preferences → Generating → Trip Workspace
│   │   ├── Trips/           # My Trips → Trip Detail
│   │   ├── Explore/  Deals/  Destinations/
│   │   └── Profile/  Settings/  Saved/  Transactions/  Notifications/  Help/  Privacy/
│   │
│   ├── components/
│   │   ├── travel/          # 13 domain components — FlightCard, HotelCard,
│   │   │                    #   ItineraryItemCard, BudgetChart, SearchWidget…
│   │   ├── ui/              # 19 shadcn/ui primitives on Radix
│   │   ├── Navbar.tsx  Footer.tsx
│   │   └── theme-provider.tsx  theme-toggle.tsx
│   │
│   ├── context/
│   │   └── app-state.tsx    # Persistent trip workspace + wishlist
│   ├── data/                # 11 mock modules + types.ts (flights, hotels, activities,
│   │                        #   destinations, promos, compass, transactions…)
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── layouts/root-layout.tsx
│   ├── lib/                 # format.ts (currency, dates) · utils.ts (cn)
│   ├── utility/             # ScrollToTop, CustomCursor
│   ├── index.css            # Design tokens — light + dark
│   └── App.tsx              # Router
├── tailwind.config.js
├── vite.config.ts           # "@" alias → ./src
└── vercel.json              # SPA rewrite
```

### Key decisions

| Decision | Why |
|---|---|
| **No backend** | The case needs an explorable product, not infrastructure. All data is typed and local. |
| **Context + `localStorage`** | The trip workspace must survive a page refresh — that persistence *is* the "Reconnect" pillar, not a technical convenience. |
| **shadcn/ui over a component library** | Components live in the repo and can be restyled to the brand without fighting a vendor theme. |
| **CSS variables for theming** | One token set drives both light and dark mode; components never hard-code a colour. |
| **`@` path alias** | `@/components/...` keeps imports stable as pages move between folders. |

---

## 🚦 Route Map

30 routes — 29 inside a shared layout with navbar, footer, and scroll restoration, plus a catch-all 404.

<table>
<tr><th>Pillar</th><th>Route</th><th>Page</th></tr>

<tr><td rowspan="6"><b>A</b><br>Attract</td><td><code>/</code></td><td>Landing — hero, value proposition, featured destinations</td></tr>
<tr><td><code>/about</code></td><td>About — the Lanjalan story and AIR framework</td></tr>
<tr><td><code>/onboarding</code></td><td>Onboarding — first-run preference capture</td></tr>
<tr><td><code>/explore</code></td><td>Explore — destination discovery</td></tr>
<tr><td><code>/destinations/:id</code></td><td>Destination detail</td></tr>
<tr><td><code>/deals</code></td><td>Deals — promotions and campaigns</td></tr>

<tr><td rowspan="9"><b>Core</b><br>OTA booking</td><td><code>/flights</code></td><td>Flight search</td></tr>
<tr><td><code>/flights/results</code></td><td>Flight results with filters</td></tr>
<tr><td><code>/flights/checkout</code></td><td>Checkout</td></tr>
<tr><td><code>/booking-success</code></td><td>Booking confirmation</td></tr>
<tr><td><code>/hotels</code></td><td>Hotel search</td></tr>
<tr><td><code>/hotels/results</code></td><td>Hotel results</td></tr>
<tr><td><code>/hotels/:id</code></td><td>Hotel detail</td></tr>
<tr><td><code>/activities</code> · <code>/activities/results</code></td><td>Activity search and results</td></tr>
<tr><td><code>/activities/:id</code></td><td>Activity detail</td></tr>

<tr><td rowspan="4"><b>I</b><br>Individualize</td><td><code>/compass</code></td><td>Compass intro — what the planner does</td></tr>
<tr><td><code>/compass/preferences</code></td><td>Budget, travel style, interests, pace</td></tr>
<tr><td><code>/compass/generating</code></td><td>Itinerary generation sequence</td></tr>
<tr><td><code>/compass/trip/:id</code></td><td><b>Trip Workspace</b> — the day-by-day itinerary</td></tr>

<tr><td rowspan="4"><b>R</b><br>Reconnect</td><td><code>/trips</code></td><td>My Trips — every journey in progress</td></tr>
<tr><td><code>/trips/:id</code></td><td>Trip detail — flight, hotel, activities in one place</td></tr>
<tr><td><code>/transactions</code></td><td>Transaction history</td></tr>
<tr><td><code>/notifications</code></td><td>Notifications</td></tr>

<tr><td rowspan="6"><b>Account<br>& support</b></td><td><code>/saved</code></td><td>Wishlist</td></tr>
<tr><td><code>/profile</code></td><td>Profile</td></tr>
<tr><td><code>/settings</code></td><td>Settings, including theme</td></tr>
<tr><td><code>/help</code></td><td>Help centre</td></tr>
<tr><td><code>/privacy</code></td><td>Privacy policy</td></tr>
<tr><td><code>*</code></td><td>404 — Not Found</td></tr>
</table>

---

## 🧭 Lanjalan Compass

The flagship feature, and the direct answer to the survey's strongest finding: **80% of respondents need
help turning activities into a daily itinerary.**

**The flow**

```
Intro  →  Preferences  →  Generating  →  Trip Workspace
          budget           building       day-by-day itinerary
          style            the plan       with reasons attached
          interests
          pace
```

**What makes it more than a list**

| Element | Detail |
|---|---|
| **Context-aware input** | Destination, dates, duration, travellers, budget, style, interests, and pace — matching the exact factors respondents said they need recommendations to respect |
| **Recommendation reasoning** | Every suggestion carries a stated reason, answering the 90% who want to know *why* something was recommended |
| **Persistent state** | Preferences and the generated itinerary live in `app-state.tsx` and survive refresh — a trip can be abandoned and resumed |
| **Connected booking** | Flights, hotels, and activities booked anywhere in the app attach to the same active trip |

---

## 🎨 Design System

### Tokens

All colours are HSL CSS variables in `src/index.css`, consumed through Tailwind. Nothing is hard-coded, so
both themes stay in sync.

| Token | Light | Role |
|---|---|---|
| `--primary` | `201 56% 47%` | Brand blue — primary actions |
| `--primary-dark` | `201 64% 36%` | Deep brand bands and headers |
| `--accent` | `27 100% 61%` | Orange — highlights, promos |
| `--foreground` | `211 56% 20%` | Navy ink |
| `--background` | `210 40% 98%` | Page ground |
| `--success` / `--warning` / `--destructive` | `155 65% 38%` / `40 81% 50%` / `0 64% 55%` | Semantic states |
| `--radius` | `1rem` | Global corner radius |

### Typography

**Plus Jakarta Sans** for everything, with **Inter** as fallback — both loaded from Google Fonts in
`index.html`. Plus Jakarta Sans was commissioned as Jakarta's city typeface, which makes it a deliberate
fit for an Indonesian travel product rather than a neutral default.

### Theming

`theme-provider.tsx` supports **light**, **dark**, and **system**, toggling a `class` on the root element
and persisting the choice under the `vite-ui-theme` key. A dedicated `--on-dark` token keeps text readable
on brand-dark bands that never flip with the theme.

### Motion

Framer Motion drives page transitions and card reveals; `fade-in.tsx` wraps the common entrance pattern so
timing stays consistent across pages.

---

## 🚢 Deployment

`vercel.json` already contains the SPA rewrite every client-side router needs:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

**Vercel** — import the repository, set the root directory to `frontend`, and accept the defaults
(`npm run build`, output `dist`).

**Any static host** — run `npm run build` and serve `dist/`, making sure unknown paths fall back to
`index.html` so deep links such as `/compass/trip/1` resolve.

---

## 🧩 Conventions

- **Pages** are `PascalCase` folders under `src/pages/`, exporting a default component from `page.tsx` or a
  descriptive file such as `ResultsPage.tsx`.
- **Imports** use the `@` alias: `import { Button } from "@/components/ui/button"`.
- **Mock data** lives in `src/data/` and is typed through `types.ts` — add new inventory there, never inline
  in a component.
- **Formatting helpers** (`formatIDR`, date helpers) belong in `src/lib/format.ts` so currency rendering
  stays consistent.
- **New UI primitives** are added via shadcn/ui into `src/components/ui/`; domain-specific cards belong in
  `src/components/travel/`.

---

<div align="center">

Part of the [**Lanjalan**](../README.md) case study · COMPFEST 18 Product Management Academy

</div>
