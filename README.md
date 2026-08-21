<div align="center">

<img src="frontend/public/Images/logo.png" alt="Lanjalan logo" width="110" />

# Lanjalan

**An Online Travel Agent that plans the whole journey — not just the ticket.**

Business case, user research, and interactive prototype for the
COMPFEST 18 Product Management Academy.

<br>

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![Jupyter](https://img.shields.io/badge/Jupyter-EDA-F37626?logo=jupyter&logoColor=white)](https://jupyter.org)
[![Status](https://img.shields.io/badge/status-prototype-success)](#)

[Overview](#-overview) ·
[The Insight](#-the-insight-that-shaped-the-product) ·
[AIR Framework](#-the-air-framework) ·
[Repository](#-repository-structure) ·
[Quick Start](#-quick-start) ·
[Docs](#-documentation-map)

</div>

---

## 📌 Overview

**Lanjalan** (Indonesian: *"lanjut jalan"* — keep going) is a concept Online Travel Agent built around a
single observation: booking a ticket is easy, but **planning a trip is exhausting**. Travellers juggle
several apps, hop between platforms to compare prices, and take days to finish one plan.

This repository holds the two halves of that case:

| Half | What it is | Where |
|---|---|---|
| 🔬 **Research** | A survey of 50 Indonesian travellers, turned into a full exploratory data analysis with 34 charts, segmentation, clustering, and a feature-priority matrix | [`data-analysis/`](data-analysis) |
| 💻 **Product** | An interactive React prototype of the OTA — 31 pages, from flight search to the flagship AI trip planner | [`frontend/`](frontend) |

The research is not decoration. Every headline feature in the prototype traces back to a number in the
notebook, and the notebook's priority matrix decides what the prototype puts first.

---

## 🔍 The Insight That Shaped the Product

Five findings from the 50-respondent survey drove every product decision:

| # | Finding | Evidence |
|---|---|---|
| 1 | **Planning is fragmented.** Travellers do not want one more app — they want to stop needing many. | 96% use multiple apps for one trip · 98% switch platforms to compare prices · 94% need several days to finish a plan |
| 2 | **Awareness is solved; discovery is not.** Everyone knows OTAs sell more than tickets, but the add-ons are hard to find at the right moment. | 100% aware · far fewer find add-on services easily |
| 3 | **People want guided itineraries.** Choosing activities for a multi-day trip is the hardest part. | 80% need help building a daily itinerary |
| 4 | **Recommendations must justify themselves.** Personalisation without a reason erodes trust. | 90% want to know *why* something was recommended |
| 5 | **The real competitor is social media.** OTAs only enter at the transaction stage. | Instagram 60% · TikTok 56% · OTA only 38% as a top-3 planning platform |

> [!NOTE]
> With n = 50, these numbers point to strong direction and hypotheses — not population-level generalisation.
> The notebook reports effect sizes alongside p-values and states this limitation explicitly.

---

## 🧭 The AIR Framework

The prototype organises Lanjalan's differentiation into three moves, each answering one of the findings above.

<table>
<tr>
<td width="33%" valign="top">

### A — Attract
**Meet travellers before the booking.**

Landing, campaigns, onboarding, destination discovery, and deals — designed to win the inspiration stage
that social media currently owns.

</td>
<td width="33%" valign="top">

### I — Individualize
**Lanjalan Compass.**

The flagship feature: an AI trip planner that turns destination, dates, budget, and interests into a
day-by-day itinerary — with a stated reason behind every recommendation.

</td>
<td width="33%" valign="top">

### R — Reconnect
**One persistent trip workspace.**

Flights, hotels, and activities stay attached to a single trip. The journey can be paused and resumed
instead of restarting in another app.

</td>
</tr>
</table>

---

## 📁 Repository Structure

```
Lanjalan-PMA-CF18/
│
├── data-analysis/                    # 🔬 Research — survey EDA
│   ├── dataset.csv                   # 50 survey responses (source of truth)
│   ├── eda-ota.ipynb                 # Full EDA — Indonesian
│   ├── eda-ota-english.ipynb         # Full EDA — English (identical results)
│   ├── dataset_clean_with_features*.csv   # Clean data + derived features
│   ├── ringkasan_eda_ota.xlsx        # Summary tables (ID)
│   ├── eda_ota_summary_en.xlsx       # Summary tables (EN)
│   ├── template.png                  # Appendix slide layout reference
│   └── README.md                     # → Methodology, data dictionary, findings
│
├── frontend/                         # 💻 Product — interactive prototype
│   ├── src/
│   │   ├── pages/                    # 31 route-level pages
│   │   ├── components/travel/        # Domain components (flight, hotel, itinerary…)
│   │   ├── components/ui/            # shadcn/ui primitives
│   │   ├── context/app-state.tsx     # Persistent trip workspace
│   │   ├── data/                     # Typed mock catalogue
│   │   └── index.css                 # Design tokens (light + dark)
│   ├── tailwind.config.js
│   ├── vercel.json                   # SPA rewrite for deployment
│   └── README.md                     # → Setup, architecture, routes
│
└── README.md                         # You are here
```

---

## 🚀 Quick Start

Two independent workspaces — start with whichever half you came for.

### 💻 Run the prototype

```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

Requires **Node.js 18+**. Full details in [`frontend/README.md`](frontend/README.md).

### 🔬 Reproduce the analysis

```bash
cd data-analysis
pip install pandas numpy matplotlib seaborn plotly wordcloud scikit-learn scipy networkx statsmodels openpyxl jupyter
jupyter notebook eda-ota-english.ipynb     # or eda-ota.ipynb for Indonesian
```

Requires **Python 3.10+**. Run all cells — every chart, table, and export regenerates from `dataset.csv`.
Full details in [`data-analysis/README.md`](data-analysis/README.md).

---

## 🧱 Tech Stack

<table>
<tr><td valign="top" width="50%">

**Frontend**

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript 5.8 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3.4 + CSS variables |
| Components | shadcn/ui on Radix primitives |
| Motion | Framer Motion |
| Routing | React Router 7 |
| Charts | Recharts |
| State | React Context + `localStorage` |

</td><td valign="top" width="50%">

**Data analysis**

| Layer | Choice |
|---|---|
| Core | pandas · NumPy |
| Static charts | matplotlib · seaborn |
| Interactive charts | Plotly |
| Text | WordCloud · Counter-based n-grams |
| Statistics | SciPy (Mann-Whitney, Kruskal-Wallis) |
| ML | scikit-learn (K-Means, PCA) |
| Graphs | NetworkX |
| Export | openpyxl |

</td></tr>
</table>

---

## 📚 Documentation Map

| Document | Read it for |
|---|---|
| [`data-analysis/README.md`](data-analysis/README.md) | Survey methodology, data dictionary, notebook walkthrough, key findings, how to extend the analysis |
| [`frontend/README.md`](frontend/README.md) | Local setup, project architecture, complete route map, design system, deployment |
| `data-analysis/eda-ota.ipynb` | The analysis itself, in Indonesian |
| `data-analysis/eda-ota-english.ipynb` | The same analysis, in English |

---

## 🗺️ Roadmap

- [x] Field the traveller survey and clean the responses
- [x] Full exploratory data analysis in two languages
- [x] Interactive prototype covering the core OTA flow
- [x] Lanjalan Compass — itinerary planner with persistent trip state
- [ ] Grow the sample to n ≥ 200 with age quotas so statistical tests gain power
- [ ] Add open-ended survey questions for genuine text analysis
- [ ] Usability-test the Compass prototype with the infrequent-user segment
- [ ] Connect the prototype to a real inventory API

---

## 👤 Author

**Stanley Nathanael Wijaya** — research, analysis, and prototype
· [GitHub](https://github.com/StyNW7)

Built for the **COMPFEST 18 Product Management Academy** business case.

---

## 📄 License & Usage

This repository has no license file yet, so default copyright applies — all rights reserved by the author.
It is coursework prepared for an academic competition; please ask before reusing the analysis or the
prototype. Survey responses are anonymised (initials only) and contain no personal contact data.

<div align="center">

<br>

**Lanjalan** — *keep going.*

</div>
