# ✅ QAAutoTester Project Checklist

**Goal:** Build an automated Playwright testing dashboard that runs scheduled tests, stores results, and visualizes them in a web UI.

---

## 🧱 Project Setup

- [x] Create new repo: `qaautotester`
- [x] Add folders:
  - [x] `/tests` → Playwright test files
  - [x] `/server` → Express/Fastify backend API
  - [x] `/client` → Next.js dashboard
- [x] Initialize npm in `/server` and `/tests`
- [x] Create `.gitignore`, `README.md`, and MIT `LICENSE`
- [x] Add ESLint + Prettier for formatting

---

## 🧩 Week 1: Test Runner + API

---

### 🧠 Phase 1 — Playwright Setup

- [x] Install Playwright: `npm install -D @playwright/test`
- [x] Add example test (`tests/homepage.spec.js`)
- [x] Confirm tests run with:
  ```bash
  npx playwright test
  ```
- [x] Generate JSON Report `npx playwright test --reporter=json > results.json`

### 💾 Phase 2 — Database Setup

- [x] Install SQLite (dev) and PostgreSQL (prod)
- [x] Create results table [id, name, status, duration, timestamp]
- [x] connect DB in the backend `/server/db.js`
- [x] test simple CRUD insert/read functions

### 🔗 Phase 3 — API Routes

- [x] Create Express server
- [x] add endpoints `
  - [x] `GET /results` -> reurn all results
  - [x] `POST /results` -> saves new results
- [x] Parse Playwright JSON results and send via API
- [x] Test routes with Postman

### 🎯 Week 1 Deliverables

- [x] CLI command runs Playwright tests and saves results to DB
- [x] API serves test data locally
- [x] Committed schema + working backend
- [ ] README updated with progress

---

# ✅ QAInsight Week 2 Checklist: Dashboard + Automation

---

## 🧠 Phase 1 — Frontend Dashboard Setup

- [ ] Create Next.js app in `/client`
- [ ] Install TailwindCSS and Recharts
- [ ] Create pages/components:
  - [ ] `<SummaryCard />` → shows total tests & pass rate
  - [ ] `<ResultsTable />` → displays sortable log of test results
  - [ ] `<TrendChart />` → line chart for tests over time
- [ ] Fetch data from API (`/results`) using `fetch` or `axios`
- [ ] Style dashboard with Tailwind for responsive layout
- [ ] Test locally using mock data

---

## ⚙️ Phase 2 — CI/CD Automation

- [ ] Create `.github/workflows/run-tests.yml`
- [ ] Add nightly cron job:
  ```yaml
  on:
    schedule:
      - cron: "0 2 * * *" # Every night at 2 AM
  ```
- [ ] Workflow steps:
  - [ ] Checkout repo
  - [ ] Install dependencies
  - [ ] Run Playwright tests
  - [ ] Save results via API or commit artifact
- [ ] Verify workflow runs successfully
- [ ] Add CI badge to README

---

## ☁️ Phase 3 — Deployment

- [ ] Deploy backend API to **Render**
- [ ] Deploy frontend dashboard to **Vercel**
- [ ] Update frontend API URL to deployed endpoint
- [ ] Confirm dashboard loads live test results correctly
- [ ] Record a 2-minute Loom video walkthrough
- [ ] Update README with live links, screenshots, and description

---

## 💡 Optional Enhancements

- [ ] Add user authentication (Clerk or Supabase Auth)
- [ ] Configure Discord/email notifications for failed tests
- [ ] Enable custom URL inputs for tests
- [ ] Export test results as CSV
- [ ] Categorize tests by type (Smoke, Regression, UI)
- [ ] Implement retry logic for flaky tests

---

## 🎯 Deliverables for Week 2

- [ ] Live frontend dashboard with charts
- [ ] Automated nightly Playwright tests via GitHub Actions
- [ ] CI badge in README
- [ ] Video walkthrough completed
- [ ] Full README updated with links and screenshots
