<div align="center">

# 🔬 Lanjalan · Traveller Survey Analysis

**What 50 Indonesian travellers told us about planning a trip — and what an OTA should build because of it.**

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-F37626?logo=jupyter&logoColor=white)](https://jupyter.org)
[![pandas](https://img.shields.io/badge/pandas-2.2-150458?logo=pandas&logoColor=white)](https://pandas.pydata.org)
[![Plotly](https://img.shields.io/badge/Plotly-interactive-3F4F75?logo=plotly&logoColor=white)](https://plotly.com/python/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-K--Means%20%2B%20PCA-F7931E?logo=scikitlearn&logoColor=white)](https://scikit-learn.org)
[![Charts](https://img.shields.io/badge/charts-34%20static%20%2B%206%20interactive-1B6CA8)](#-notebook-walkthrough)
[![Languages](https://img.shields.io/badge/notebooks-ID%20%2B%20EN-2A9D8F)](#-two-notebooks-one-analysis)

[Dataset](#-the-dataset) ·
[Run it](#-running-the-notebooks) ·
[Walkthrough](#-notebook-walkthrough) ·
[Findings](#-key-findings) ·
[Outputs](#-generated-outputs) ·
[Limitations](#-limitations)

</div>

---

## 📌 What This Is

A complete exploratory data analysis of a self-administered survey on **travel-planning behaviour and OTA
usage** (Traveloka, Agoda, tiket.com, and similar). The goal was never a report for its own sake — it was to
answer one product question:

> **What makes people use, or abandon, an OTA platform — and which feature should be built first?**

The notebook runs end to end from the raw CSV: cleaning, feature engineering, segmentation, statistical
testing, clustering, text analysis, and a feature-priority matrix. Every chart is configured with large
fonts so it can be lifted straight into a slide deck.

---

## 🌐 Two Notebooks, One Analysis

| Notebook | Language | Contents |
|---|---|---|
| [`eda-ota.ipynb`](eda-ota.ipynb) | 🇮🇩 Indonesian | 72 cells · 34 static charts · 6 interactive charts |
| [`eda-ota-english.ipynb`](eda-ota-english.ipynb) | 🇬🇧 English | 72 cells · 34 static charts · 6 interactive charts |

Both notebooks read the same `dataset.csv` and produce **numerically identical results** — verified cell by
cell on the Likert columns, dimension scores, cluster labels, and segment assignments. Only the language
differs.

> [!NOTE]
> The English notebook also translates the *data values* (categories and multiple-choice options), so its
> word clouds and n-grams show English vocabulary. The underlying distributions are unchanged.

---

## 📊 The Dataset

`dataset.csv` — **50 respondents × 28 columns**, collected August 2026 via an online form.
No missing values, no duplicates, every Likert answer inside the valid 1–5 range, and all three
"pick exactly 3" questions answered with exactly three options.

### Data dictionary

| # | Field | Type | Description |
|---|---|---|---|
| 1 | `timestamp` | datetime | Submission time |
| 2 | `name` | text | Name or initials (anonymised) |
| 3 | `age` | ordinal | 18–21 · 22–25 · 26–30 · 31–35 · 36–40 · Above 40 |
| 4 | `occupation` | nominal | Employee, Student, Freelancer, Entrepreneur, Homemaker, Professional, Consultant |
| 5 | `trip_freq` | ordinal | Trips in the last 12 months: 1 · 2–3 · 4–5 · more than 5 |
| 6 | `ota_freq` | ordinal | OTA usage: rarely · a few times a year · monthly · more than monthly |
| 7 | `companion` | nominal | Family · Friends · Solo · Partner · Colleagues |
| 8 | `trip_type` | nominal | Domestic · Mixed domestic & international · Long-haul international |
| 9–25 | `Q1`–`Q17` | Likert 1–5 | Seventeen behaviour and need statements (see below) |
| 26 | `ms_switch_reason` | multi-select | Why they switch platforms — pick exactly 3 of 11 |
| 27 | `ms_platform` | multi-select | Platforms used to plan a trip — pick exactly 3 of 10 |
| 28 | `ms_product` | multi-select | Products booked most via OTA — pick exactly 3 of 6 |

### The 17 Likert statements

| Code | Statement (abbreviated) | Dimension |
|---|---|---|
| Q1 | Book transport tickets before hotels and activities | — sequence |
| Q2 | Search hotels before the ticket purchase is complete | — sequence |
| Q3 | Planning one trip takes several days | Planning Fragmentation |
| Q4 | Use multiple apps or sites for one trip | Planning Fragmentation |
| Q5 | Frequently switch platforms to compare prices | Planning Fragmentation |
| Q6 | Know OTAs also sell hotels and activities | Awareness & Cross-sell |
| Q7 | Easy to find add-on services after buying a ticket | Awareness & Cross-sell |
| Q8 | Post-ticket hotel/activity offers catch my attention | Awareness & Cross-sell |
| Q9 | Understand the benefit of booking on one platform | Awareness & Cross-sell |
| Q10 | OTA recommendations match my needs | Trust & Transparency |
| Q11 | Need recommendations by destination, dates, duration, budget | Personalisation Need |
| Q12 | Hard to decide activities for a multi-day trip | Personalisation Need |
| Q13 | Need help arranging activities into a daily itinerary | Personalisation Need |
| Q14 | Want to know *why* something was recommended | Trust & Transparency |
| Q15 | Trust the recommendations OTAs give | Trust & Transparency |
| Q16 | Price, location, rating, reviews drive my decision | Trust & Transparency |
| Q17 | Have abandoned an OTA because booking was too complex | Friction Sensitivity |

### Respondent profile

| Dimension | Composition |
|---|---|
| **Age** | 26–30 (15) · 22–25 (14) · 18–21 (12) · 31–35 (5) · Above 40 (3) · 36–40 (1) — **94% aged 18–40** |
| **Occupation** | Employee (22) · Student (14) · Freelancer (6) · Entrepreneur (4) · other (4) |
| **Travel companion** | Family (23) · Friends (13) · Solo (5) · Partner (5) · Colleagues (4) |
| **Trip type** | Domestic (29) · Mixed (20) · Long-haul international (1) |
| **Trips per year** | 2–3 (29) · 4–5 (10) · more than 5 (6) · 1 (5) |
| **OTA usage** | Occasional (29) · Regular (13) · Rare (5) · Power (3) — **only 32% are monthly users** |

---

## 🔧 Running the Notebooks

### Requirements

**Python 3.10+**, then:

```bash
pip install pandas numpy matplotlib seaborn plotly wordcloud \
            scikit-learn scipy networkx statsmodels openpyxl jupyter
```

### Run

```bash
cd data-analysis
jupyter notebook eda-ota-english.ipynb    # or eda-ota.ipynb
```

Then **Run All**. The notebooks are self-contained — they read `dataset.csv` from the working directory and
regenerate every chart, table, and export file.

> [!TIP]
> The 6 Plotly charts render in JupyterLab, Jupyter Notebook, VS Code, and Google Colab. GitHub's static
> preview cannot render them; run the notebook locally to interact, or set
> `pio.renderers.default = 'notebook'` in cell 1.2 to embed the JavaScript in the file.

---

## 🧭 Notebook Walkthrough

Eighteen parts, in the order the analysis actually needs them.

<table>
<tr><th>Part</th><th>Section</th><th>What it produces</th></tr>

<tr><td>1</td><td><b>Setup</b></td><td>Large-font matplotlib config, shared palette, helper functions (<code>wrap</code>, <code>section</code>, <code>insight</code>)</td></tr>
<tr><td>2</td><td><b>Load & clean</b></td><td>Column renaming to <code>Q1</code>–<code>Q17</code>, value normalisation, ordinal category ordering</td></tr>
<tr><td>3</td><td><b>Data quality</b></td><td>Completeness heatmap, Likert range validation, pooled answer distribution</td></tr>
<tr><td>4</td><td><b>Feature engineering</b></td><td>OTA segments, generation groups, 5 dimension scores, Super-App Readiness Index, one-hot multi-select</td></tr>
<tr><td>5</td><td><b>Demographics</b></td><td>4-panel profile dashboard, interactive donut charts</td></tr>
<tr><td>6</td><td><b>Travel behaviour</b></td><td>Frequency comparison, crosstab heatmaps, interactive Sankey flow</td></tr>
<tr><td>7</td><td><b>Likert analysis</b></td><td>Ranked means with error bars, diverging stacked bar, Top-2-Box vs Bottom-2-Box</td></tr>
<tr><td>8</td><td><b>Dimensions</b></td><td>Dimension means, violin spread, interactive radar per segment</td></tr>
<tr><td>9</td><td><b>Active vs infrequent</b></td><td>Diverging gap chart across all 17 statements, readiness boxplots</td></tr>
<tr><td>10</td><td><b>Age & generation</b></td><td>Score heatmap by age, interactive dimension trend line, generation comparison</td></tr>
<tr><td>11</td><td><b>Other segments</b></td><td>Occupation, travel companion, trip type, travel intensity</td></tr>
<tr><td>12</td><td><b>Multiple choice</b></td><td>Switching reasons, platform competitors, product mix, co-occurrence matrices</td></tr>
<tr><td>13</td><td><b>Text analysis</b></td><td>Combined and per-theme word clouds, top words and bigrams, agreement-weighted needs cloud</td></tr>
<tr><td>14</td><td><b>Correlation</b></td><td>Spearman matrix, NetworkX association graph of need hubs</td></tr>
<tr><td>15</td><td><b>Statistics</b></td><td>Mann-Whitney U with rank-biserial effect size, Kruskal-Wallis with epsilon-squared, significance map</td></tr>
<tr><td>16</td><td><b>Clustering</b></td><td>Elbow + silhouette, K-Means personas, PCA projection, deviation profiles</td></tr>
<tr><td>17</td><td><b>Prioritisation</b></td><td>Gap analysis, Importance–Performance matrix, interactive cross-sell funnel</td></tr>
<tr><td>18</td><td><b>Conclusions</b></td><td>KPI dashboard, automated findings summary, 8 strategic recommendations, exports</td></tr>
</table>

### Derived variables

| Variable | Definition |
|---|---|
| `ota_segment` | Power · Regular · Occasional · Rare — from OTA usage frequency |
| `ota_group` | Binary: Active (monthly+) vs Infrequent (yearly−) |
| `generation` | Gen Z (18–25) · Millennial (26–40) · Gen X+ (>40) |
| `traveler_type` | Light · Medium · Frequent, from trips per year |
| **Planning Fragmentation** | mean(Q3, Q4, Q5) — how scattered the process is |
| **Awareness & Cross-sell** | mean(Q6, Q7, Q8, Q9) — appetite beyond tickets |
| **Personalisation Need** | mean(Q11, Q12, Q13) — need for guidance |
| **Trust & Transparency** | mean(Q10, Q14, Q15, Q16) — trust and the need for evidence |
| **Friction Sensitivity** | Q17 — tendency to abandon a complex flow |
| **Super-App Readiness Index** | mean(Q6, Q8, Q9, Q10, Q15) — readiness to consolidate onto one platform |

---

## 💡 Key Findings

### Dimension scores (1–5 scale)

| Dimension | Score | Reading |
|---|---:|---|
| Planning Fragmentation | **4.59** | The strongest signal in the whole survey |
| Awareness & Cross-sell | 4.47 | Awareness is not the bottleneck |
| Trust & Transparency | 4.32 | Trust exists, but it is conditional |
| Friction Sensitivity | 4.20 | Complexity actively costs conversions |
| Personalisation Need | 4.06 | Highest variance — this is what separates segments |

### The five headline numbers

| Finding | Number |
|---|---|
| Use more than one app for a single trip | **96%** |
| Switch platforms just to compare prices | **98%** |
| Need several days to finish planning | **94%** |
| Want to know *why* something is recommended | **90%** |
| Have abandoned an OTA over a complicated process | **86%** |

### Who the real competitor is

Respondents were asked to name their three main trip-planning platforms:

| Platform | Share |
|---|---:|
| Instagram | 60% |
| TikTok | 56% |
| Google Maps | 50% |
| **Online Travel Agent** | **38%** |
| Google Search | 30% |

> The battle is lost before the booking app opens. OTAs compete with the *inspiration stage*, not with
> each other.

### Two segments, two different problems

Splitting by travel frequency (≤ 3 trips/year, n = 34 vs > 3 trips/year, n = 16) produces the sharpest
contrast in the dataset:

| Need (top-2-box) | ≤ 3 trips/yr | > 3 trips/yr | Gap |
|---|---:|---:|---:|
| Hard to pick multi-day activities | 85% | 56% | −29 pp |
| Need help building an itinerary | 88% | 62% | −26 pp |
| Trust OTA recommendations | 85% | 62% | −23 pp |
| Want recommendation reasoning | 97% | 75% | −22 pp |
| Abandoned an OTA over complexity | 82% | 94% | +11 pp |

**Occasional travellers need guidance. Frequent travellers need speed.** One product approach cannot
serve both.

### What this means for the product

| Priority | Feature | Backed by |
|---|---|---|
| 1 | **Trip Planner / itinerary builder** driven by destination, dates, duration, budget | Q11 · Q12 · Q13 |
| 2 | **Recommendation reasoning** on every card | Q14 — high in every generation |
| 3 | **Contextual post-booking cross-sell** | Gap between Q8 and Q7 |
| 4 | **Price transparency & guarantee** | Q5 · top switching reasons |
| 5 | **One-page checkout** | Q17 |
| 6 | **Presence in the inspiration stage** | Social channels dominate planning |

---

## 📦 Generated Outputs

Running a notebook writes these files into this folder:

| File | From | Contents |
|---|---|---|
| `dataset_clean_with_features.csv` | 🇮🇩 notebook | Clean data + all derived variables (Indonesian names) |
| `dataset_clean_with_features_en.csv` | 🇬🇧 notebook | Same data, English column names |
| `ringkasan_eda_ota.xlsx` | 🇮🇩 notebook | 6 summary sheets |
| `eda_ota_summary_en.xlsx` | 🇬🇧 notebook | 6 summary sheets, English |

Each workbook holds: Likert statistics · dimensions by segment · dimensions by generation ·
Mann-Whitney results · gap analysis · word frequencies.

`template.png` is the appendix slide layout used as the design reference when turning these findings into
presentation form.

---

## 🚨 Limitations

Read the numbers with these constraints in mind — they are stated in the notebook too, not hidden here.

- **Small sample (n = 50).** Only 1 of 23 tested variables reaches p < 0.05 between active and infrequent
  users. The tests have low power; treat findings as direction and hypotheses, never as population
  generalisation. Effect sizes are reported alongside every p-value for this reason.
- **Positive answer bias.** Most answers land on 4–5, so *relative* comparisons between statements and
  segments are far more trustworthy than absolute values.
- **No open-ended questions.** The word clouds are built from closed-option text, so they reflect the
  form's vocabulary rather than fully spontaneous language.
- **Thin segment cells.** The 36–40 age group has n = 1; readings for the smallest cells are indicative only.
- **Stated preference, not behaviour.** This is attitudinal data and should be validated against real click
  or transaction data before major investment.

---

## 🔭 Extending the Analysis

Concrete next steps, in the order they would add the most value:

1. **Grow the sample to n ≥ 200** with quotas per age group so the statistical tests gain power.
2. **Add open-ended questions** ("describe the last trip you planned") to enable genuine text mining.
3. **Run a conjoint analysis** to quantify the trade-off between price, convenience, and completeness.
4. **Prototype-test Lanjalan Compass** with the infrequent-user segment — the largest growth pocket.

To adapt the notebook for a new wave of responses, keep the same form structure and only update
`LIKERT_ORDER` and the rename dictionaries in section 2.2 — every downstream section derives from there.

---

<div align="center">

Part of the [**Lanjalan**](../README.md) case study · COMPFEST 18 Product Management Academy

</div>
