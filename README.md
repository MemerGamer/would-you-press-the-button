# Would You Press The Button?

![logo](./public/button.png)

A lightweight, privacy‑respectful React app that collects and displays
client-side environment details: browser, device, network, storage, and optional
geolocation. It’s designed for debugging, demos, and educating users about what
their browser reveals.

Live features include:

- One-click data collection with a polished UI (Tailwind CSS)
- i18n with a language switcher (EN, HU, RO)
- Tabbed interface for Overview, Browser, Device, Network, Storage, Location
- Pretty-printed JSON snapshots
- Optional geolocation request, only on demand
- Graceful handling of unsupported/unavailable data

## Table of contents

- [Would You Press The Button?](#would-you-press-the-button)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [How it works](#how-it-works)
  - [Development](#development)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Security \& privacy notes](#security--privacy-notes)
  - [Limitations](#limitations)
  - [Roadmap ideas](#roadmap-ideas)

---

## Features

- Overview

  - Browser name, user agent, OS
  - Device type and mobile detection
  - Public IP (if collected in your `useCollectInfo` hook)
  - Timezone and URL/referrer
  - Online status and network type
  - Screen and viewport info
  - Storage usage snapshot
  - Raw JSON data toggle

- Browser tab

  - User agent, vendor, platform
  - Languages list, DNT flag, WebDriver flag
  - Navigation performance timings (if available)

- Device tab

  - OS, device type, cores (`hardwareConcurrency`)
  - Approx device memory (`deviceMemory`), screen specs, DPR
  - Viewport dimensions
  - Battery API (if supported)
  - Timezone offset, user activation

- Network tab

  - Online status, effective connection type
  - Downlink (Mbps), RTT (ms), save-data preference
  - Public IP (if collected), referrer, current URL

- Storage tab

  - Cookies enabled
  - LocalStorage / SessionStorage sizes
  - IndexedDB usage & quota estimate
  - Notes about variability across browsers

- Location tab

  - Explicit “Request Location” button (no implicit tracking)
  - Permission state and any returned coordinates/accuracy
  - HTTPS-only warning
  - Accuracy tip for “Position unavailable”
  - Error display

---

## Tech stack

- React + TypeScript
- react-i18next for i18n
- Tailwind CSS for styling
- prism-react-renderer for code highlighting (vsDark theme)

## How it works

- On load, the app initializes i18n and renders the Overview card.
- Press the main button to (re)collect data via `useCollectInfo()`:
  - Reads properties from `window.navigator`, `window.screen`, performance timing,
    storage usage, network info, timezone, and so on.
  - May fetch public IP (if configured).
- Tabs allow drilling into specific categories.
- “Raw data” sections render JSON large objects via `Code` using
  `prism-react-renderer`.
- Location info:
  - `useLocation()` triggers geolocation only when the user presses the button.
  - Displays permission state and coordinates if granted.
  - Warns if not HTTPS or if the platform returns “Position unavailable”.

---

## Development

Prerequisites:

- Node.js from [.nvmrc](./.nvmrc)
- Package manager: npm, pnpm, or yarn

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint/format (if configured):

```bash
npm run lint
```

---

## Internationalization (i18n)

- Implemented with `react-i18next`.
- `LanguageSwitcher` toggles among:
  - EN (English)
  - HU (Hungarian)
  - RO (Romanian)

---

## Security & privacy notes

- This app runs entirely in the browser and shows what your client exposes.
- Geolocation is never requested automatically, only when the user clicks
  “Request location”.
- Some collected information may be sensitive in certain contexts (e.g., public
  IP, location). Treat logs and deployments accordingly.
- Geolocation requires a secure context (HTTPS) in most browsers.

---

## Limitations

- Public IP visibility depends on your `useCollectInfo` implementation (you may
  need an external service or WebRTC trick; ensure you comply with privacy
  requirements).
- API support varies by browser and platform (e.g., Battery API is often
  restricted or missing).
- Performance timing and network information may be partial, rounded, or
  privacy-reduced.
- Storage size estimates differ across engines and may be approximate.

---

## Roadmap ideas

- Add more languages
- Export/share snapshot (copy JSON to clipboard, download file)
- Dark/light theme toggle
- Add PWA support
- More diagnostics (e.g., media devices, GPU/Canvas info with user consent)
- Optional server-side endpoint for anonymized telemetry (opt-in)
