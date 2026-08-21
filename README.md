# 0xFIROZ

> A dark, server-rendered portfolio board — live GitHub repos, tabbed sections, and a bilingual Arabic footer.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Live: <https://zeroxfiroz-19ch.onrender.com>

---

## Why this project exists

Portfolio sites are static brochures; this one is a live board that pulls real repos from the GitHub API at request time. It stays interesting to engineer because one page combines SSR data fetching with graceful fallbacks, memoized git-version injection, and RTL typography against a hand-built Tailwind v4 design system.

## What it does

- **Server-rendered board** — full HTML rendered per request; the GitHub fetch never touches the client.
- **Four tabs, no reload** — Projects, Experience, Skills and Education switch via client state.
- **Live "More from GitHub"** — up to 10 real repos with language dots and hover-reveal links, capped at `per_page=10` (`lib/github.ts:57`).
- **Always-renders fallback** — a curated static list takes over if the API fails or returns empty (`lib/github.ts:78`).
- **One-click resume** — downloads a Cloudflare-hosted PDF; links to `#` when the env var is unset (`components/profile-panel.tsx:13`).
- **Auto version badge** — header prints the current git tag next to the brand (`components/header.tsx:18`).
- **Per-repo favicons** — local favicons captured from each repo's live deployment (`components/main-panel.tsx:38`).
- **Bilingual RTL footer** — an Urdu couplet and Arabic signature with forced-clip color (`app/page.tsx:30`).

## Architecture

```mermaid
flowchart TD
  A[Browser request] --> B["app/page.tsx — async server component"]
  B --> C["getGithubRepos (lib/github.ts)"]
  C -->|revalidate 600s| D[GitHub REST API]
  C -->|API fails or empty| F[Static fallback list]
  C --> E[GithubRepo[]]
  B --> G[Header + ProfilePanel]
  B --> H["MainPanel (client, tab state)"]
  E --> H
  H --> I["Projects / Experience / Skills / Education"]
  H --> G
```

A page request runs `getGithubRepos` server-side, which returns up to 10 repos from the GitHub API (cached for 10 minutes) or the static fallback, then passes the array into `MainPanel`, where the Projects tab renders the "More from GitHub" list.

## Key technical decisions

### 1. Token Guarded on the Server (Security)
**Problem:** `GITHUB_TOKEN` must never reach the browser.
**Solution:** Fetch lives in the async server component; the token is read and attached only server-side.
**Outcome:** Token stays private; tokenless builds still render.
`lib/github.ts:47`

### 2. Resilient Data Fetch (Reliability)
**Problem:** Rate limits or downtime would blank the GitHub section.
**Solution:** 10-minute revalidate plus a static fallback on any failure or empty result.
**Outcome:** The section always shows repos.
`lib/github.ts:61`

### 3. Homepage Overrides for Stale Deploys (Data Integrity)
**Problem:** Repos redeploy to new hostnames; GitHub's recorded homepage goes stale.
**Solution:** A hardcoded override map beats the API's homepage field.
**Outcome:** Live-site links survive redeploys.
`lib/github.ts:20`

### 4. Version String That Can't Crash (Robustness)
**Problem:** `git describe` fails on runtimes without git.
**Solution:** `execSync` wrapped in try/catch, memoized, falling back to `""`.
**Outcome:** Header shows `v1.0.5` locally, hides the badge on deploy.
`lib/version.ts:13`

### 5. Forcing Color out of a Red Font (Typography)
**Problem:** Aref Ruqaa Ink ships baked-in red glyphs; `text-*` color is ignored.
**Solution:** A solid background clipped to the text shape (`bg-clip-text text-transparent`).
**Outcome:** The signature renders brand blue/white regardless of font internals.
`app/page.tsx:36`

## Run locally

Requires Node 18.18+ (Next.js 15) and npm.

```bash
npm install
npm run dev
```

Zero-config: runs with no env vars — fallbacks cover everything.

Production build:

```bash
npm run build && npm start
```

Lint: `npm run lint`.

## Configuration

| Env var | Required | Effects when set |
| --- | --- | --- |
| `GITHUB_TOKEN` | — | Authenticates GitHub API calls for a higher rate limit; unset → anonymous fetch, static list still used on failure (`lib/github.ts:47`) |
| `NEXT_PUBLIC_RESUME_URL` | — | Points "Download Resume" at a hosted PDF; unset → button links to `#` (`components/profile-panel.tsx:13`) |

## Project structure

```
app/
  layout.tsx        # Fonts, metadata, RTL-safe viewport
  page.tsx          # Server component: fetches repos, composes panels
  globals.css       # Tailwind v4 theme, dark board texture, animations
components/
  header.tsx        # Brand mark + git tag + mail/GitHub icons
  profile-panel.tsx # Identity, resume button, contact, skills
  main-panel.tsx    # Tabbed client panel + "More from GitHub" list
  icons.tsx         # Hand-rolled stroke icon set
  brand-icons.tsx   # Simple Icons glyphs for the toolbox strip
lib/
  data.ts           # Static resume content
  github.ts         # GitHub fetch + fallbacks + homepage overrides
  version.ts        # Memoized, failure-safe git tag reader
public/
  favicons/         # Favicons captured from live repo deployments
```

---

0xFIROZ — one page, four tabs, live straight from GitHub.

---

<div align="left">
  <font face="Aref Ruqaa" size="5">فیروز خان چوہان</font>
</div>
