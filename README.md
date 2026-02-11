# 📊 Sales Analytics Dashboard

> **Springer Capital Intern Project** — An interactive sales performance dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Recharts.

![Dashboard Preview](https://via.placeholder.com/1200x600/0f172a/0ea5e9?text=Sales+Analytics+Dashboard)

---

## 📌 Project Overview

This project is a full-featured sales analytics dashboard that visualises mock retail sales data for **2022, 2023, and 2024**. The data is inspired by the [**Kaggle Super Store Sales Dataset**](https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting), a widely used retail benchmark dataset in the data science community.

The app demonstrates:
- **Atomic Design** architecture for scalable component organisation
- **Multiple chart types** (Bar, Line, Area, Pie) switchable at runtime
- **Custom filter controls** to highlight months below a revenue threshold
- **KPI cards** with year-over-year growth indicators
- **REST API route** at `/api/sales` for data integration
- **Responsive layout** that works on desktop, tablet, and mobile

---

## 🧱 Architecture: Atomic Design

The project follows the **Atomic Design** methodology by Brad Frost, which organises UI components into five levels:

```
Atoms       → smallest indivisible elements (icons, badges, buttons)
Molecules   → groups of atoms (YearSelector, ChartTypeSwitcher, ThresholdFilter)
Organisms   → complex components (SalesChart, ProfitChart, SalesSummaryTable, Sidebar)
Templates   → page layouts with slots (DashboardLayout)
Pages       → complete views with real data (DashboardPage)
```

### Directory Structure

```
sales-dashboard/
│
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx                # Root layout (HTML shell, fonts, global CSS)
│   ├── page.tsx                  # Root "/" → redirects to /dashboard
│   ├── globals.css               # Tailwind directives + global CSS tokens
│   ├── not-found.tsx             # 404 page
│   ├── api/
│   │   └── sales/
│   │       └── route.ts          # GET /api/sales API endpoint
│   └── dashboard/
│       ├── layout.tsx            # Dashboard shell (Sidebar + Header)
│       └── page.tsx              # Main dashboard page (all charts)
│
├── components/
│   ├── charts/                   # Chart organisms
│   │   ├── SalesChart.tsx        # Multi-type revenue chart (bar/line/area/pie)
│   │   ├── ProfitChart.tsx       # Area chart for profit trends
│   │   └── UnitsChart.tsx        # Grouped bar chart for units sold
│   └── ui/                       # UI molecules and organisms
│       ├── KPICard.tsx           # Single KPI metric card
│       ├── YearSelector.tsx      # Year toggle pills
│       ├── ChartTypeSwitcher.tsx # Bar/Line/Area/Pie buttons
│       ├── ThresholdFilter.tsx   # Revenue threshold slider + input
│       ├── Sidebar.tsx           # Left navigation sidebar
│       ├── Header.tsx            # Top bar with clock and user avatar
│       └── SalesSummaryTable.tsx # Monthly data table
│
├── lib/
│   ├── salesData.ts              # Mock data + helper functions
│   └── utils.ts                  # cn() class name utility
│
├── types/
│   └── sales.ts                  # TypeScript interfaces and types
│
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies and scripts
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.1.0 | React framework with App Router and Server Components |
| **TypeScript** | ^5 | Type safety across the entire codebase |
| **Tailwind CSS** | ^3.4.1 | Utility-first styling; custom tokens in `tailwind.config.ts` |
| **Recharts** | ^2.13.3 | React charting library built on D3.js SVG primitives |
| **Lucide React** | ^0.469.0 | Consistent icon set |
| **clsx** | ^2.1.1 | Conditional class name composition |
| **tailwind-merge** | ^2.5.4 | Deduplicates conflicting Tailwind classes |

---

## 🚀 Setup Guide

### Prerequisites

Make sure you have the following installed:

```bash
node --version  # v18.17.0 or higher
npm --version   # v9 or higher (comes with Node)
```

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/sales-dashboard.git
cd sales-dashboard
```

### 2. Install dependencies

```bash
npm install
```

This installs all packages listed in `package.json` into the `node_modules/` folder.

### 3. Run the development server

```bash
npm run dev
```

Next.js 15 uses **Turbopack** by default in dev mode (specified via `--turbopack` in the `dev` script). Turbopack is faster than Webpack for development builds.

Open [http://localhost:3000](http://localhost:3000) — you will be automatically redirected to `/dashboard`.

### 4. Build for production

```bash
npm run build
npm start
```

`build` compiles the app with full optimisations (tree-shaking, code splitting, CSS purging). `start` serves the compiled output.

### 5. Lint

```bash
npm run lint
```

Runs ESLint with the Next.js rules to check for code quality issues.

---

## 📦 Data Source

The mock data is calibrated to resemble a mid-size US retail/e-commerce company and is inspired by the **[Kaggle Super Store Sales Dataset](https://www.kaggle.com/datasets/rohitsahoo/sales-forecasting)**.

Key characteristics modelled:
- **Q4 spike** (November Black Friday + December holiday season)
- **Q1 dip** (post-holiday demand drop)
- **~8–10% YoY revenue growth** (realistic for a growing e-commerce brand)
- **~27% gross profit margin** (consistent with retail benchmarks)

### API Endpoint

The project includes a built-in REST API at:

```
GET /api/sales          → All years
GET /api/sales?year=2024 → Single year
```

Example response:
```json
{
  "success": true,
  "data": {
    "year": 2024,
    "records": [
      { "month": "Jan", "revenue": 168000, "units": 2160, "profit": 45360 },
      ...
    ]
  },
  "meta": {
    "year": 2024,
    "monthCount": 12,
    "source": "Kaggle Super Store Sales Dataset (mock)"
  }
}
```

---

## ✨ Features

### Core Features
- ✅ **Multi-year revenue comparison** chart (2022, 2023, 2024)
- ✅ **KPI cards** — Total Revenue, Profit, Units Sold, Avg Order Value
- ✅ **Year-over-year growth** percentage on every KPI card
- ✅ **Monthly breakdown table** with profit margin per row

### Enhancement Features
- ✅ **Custom Filter Input** — slide or type a revenue threshold; months below it are highlighted in amber across both the chart and table
- ✅ **API Integration** — `/api/sales` route handler serving JSON data
- ✅ **Multiple Chart Types** — switch between Bar, Line, Area, and Pie using the segmented control above the chart

---

## 🧩 Component Guide

### `SalesChart.tsx`
The primary chart component. Accepts `chartType`, `selectedYears`, and `threshold` props.

- **Bar**: grouped bars per month, one per selected year. Bars below `threshold` are rendered at 35% opacity using Recharts `<Cell>`.
- **Line**: smooth monotone curves with dot markers.
- **Area**: semi-transparent filled areas (good for trend reading).
- **Pie**: quarterly aggregated revenue as a donut chart.

### `ThresholdFilter.tsx`
Provides both a text input and a range slider. Local string state (`localInput`) is used for the text field to allow free typing; the numeric value is pushed to the parent only when valid.

### `YearSelector.tsx`
Multi-select pill buttons. Prevents deselecting the last remaining year (always at least one year must be shown).

### `SalesSummaryTable.tsx`
A `<table>` with `<thead>`, `<tbody>`, and `<tfoot>`. Rows below the threshold get `bg-amber-50` background. The footer row shows annual totals and overall profit margin.

---

## 📖 Code Convention

Every file in this project has **inline comments explaining every meaningful line of code**. The comment style follows this format:

```typescript
// What this line does (the "what")
// Why it's here / the design decision behind it (the "why")
const result = someFunction(input);
```

This is intentional — as an intern project, the comments are meant to teach the reader how each pattern works.

---

## 🔮 Future Enhancements

- [ ] Connect to a real database (PostgreSQL + Prisma ORM)
- [ ] Add authentication (NextAuth.js)
- [ ] Export chart as PNG (html2canvas)
- [ ] Export table as CSV (PapaParse)
- [ ] Add date range picker (instead of year tabs)
- [ ] Dark mode toggle
- [ ] Mobile sidebar drawer
- [ ] Unit tests with Jest + React Testing Library

---

## 👤 Author

Developed as an intern project at **Springer Capital**.

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Recharts.
