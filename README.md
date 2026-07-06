<div align="center">
  <img src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2023/06/FINAL-SEVEN-STARS-GREY-BACKGROUND-2023-trimmed.png" alt="Seven Stars Logo" width="200" style="margin-bottom: 20px;" />

# **Seven Stars Frontend (Pub Club Customer Portal)**

  <p>
    <b>A beautiful, high-performance, immersive customer web experience for Seven Stars Pub Club</b><br>
    <i>Next.js 14 • GSAP (ScrollTrigger) • Tailwind CSS • CMS Data Sync • Dynamic SEO</i>
  </p>

  <p>
    <strong>Live Website:</strong> <a href="https://pub-club-mu.vercel.app/">https://pub-club-mu.vercel.app/</a><br>
    <strong>Live CMS Dashboard:</strong> <a href="https://cms-seven-star.vercel.app">https://cms-seven-star.vercel.app</a>
  </p>

---

[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-18.x-blue.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)]()
[![GSAP](https://img.shields.io/badge/Animations-GSAP--3-green.svg)]()

</div>

<br />

Welcome to the **Seven Stars Frontend Portal** — the customer-facing interface for the Seven Stars Gastropub in Marsh Baldon, Oxford. This application serves dynamic content (menus, blogs, galleries, legal terms) managed via the backend CMS while providing customers with smooth animations, reservations, and information about events.

---

## 📑 Table of Contents

- [Core Principles & Features](#-core-principles--features)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [CMS Data Integration](#-cms-data-integration)
- [SEO & Metadata Architecture](#-seo--metadata-architecture)
- [Cookie Consent Banner](#-cookie-consent-banner)
- [Developer Setup](#-developer-setup)

---

## ✨ Core Principles & Features

The customer portal balances aesthetic excellence with robust data hydration:

| Feature Area             | Capabilities                                                                            |
| :----------------------- | :-------------------------------------------------------------------------------------- |
| **Immersive UI & GSAP**  | Parallax scroll layers, micro-interactions, reveal animations, and smooth transitions.  |
| **Dynamic CMS Ingestion**| Feeds from PostgreSQL database APIs in real-time, falling back gracefully to static templates. |
| **Bespoke Legal Pages**  | Fully CMS-managed `/privacy-policy` and `/terms-of-service` layouts with custom style overrides for copy/pasted markup. |
| **Global Cookie Consent**| Compliant, brand-integrated cookie manager with Accept/Reject preferences and persistent close triggers. |
| **Responsive Form Delivery** | Table reservations via OpenTable widget and event enquiry capture directly tied to the CMS lead tracker. |

---

## 🚀 System Architecture

Built for fast page speeds, high visual polish, and modularity.

- **Frontend Core**: `Next.js 14` with the `App Router` using `React 18`.
- **Styling**: `Tailwind CSS` for utility styling combined with custom CSS reset blocks for rich editor typography (`.legal-content`).
- **Animation Framework**: `GSAP (GreenSock Animation Platform)` with `ScrollTrigger` and context-specific garbage collection.
- **Client State**: `Zustand` lightweight store for localized user data tracking.

---

## 📂 Folder Structure

```text
pub-club/
├── public/                    # Static assets, local icons, and images
├── src/
│   ├── app/                   # Next.js 14 App Router
│   │   ├── (home)/            # Entry homepage route
│   │   ├── about/             # About Page
│   │   ├── blog/              # Dynamic Blog and Guides list
│   │   ├── dining/            # Dining & gastropub descriptions
│   │   ├── events/            # Pub events tracker
│   │   ├── privacy-policy/    # Dynamic CMS-integrated Privacy Policy
│   │   ├── terms-of-service/  # Dynamic CMS-integrated Terms of Service
│   │   └── layout.tsx         # Main layout wrapper hosting global elements
│   ├── components/            # Reusable components
│   │   ├── layout/            # Navbar, Footer, CookieBanner, PageLoader
│   │   └── ui/                # Buttons, Cards, Inputs
│   ├── store/                 # Zustand store fetching data from CMS
│   └── utils/                 # SEO utility functions and metadata handlers
├── .env.local                 # Local environment config (CMS API connection)
├── tailwind.config.ts         # Visual styling variables and media break rules
└── README.md                  # Frontend Documentation (You are here!)
```

---

## 🔌 CMS Data Integration

The frontend connects dynamically with the CMS API to render live menus, stories, and legal terms:

1. **Zustand CMS Store** (`src/store/useCMSStore.ts`):
   - Keeps client states hydrated by executing asynchronous fetch operations against CMS routes.
   - Includes full fallback blocks for safety in case the network connection is lost.

2. **Automatic Database Seeding**:
   - Legal routes check for section structures in the database and automatically upsert standard template clauses if missing. This guarantees that pages like `/privacy-policy` do not display a `404 Not Found` even on new databases.

---

## 📈 SEO & Metadata Architecture

SEO metadata is configured dynamically on a page-by-page basis:

- **Next.js Dynamic Metadata**: Each page layout utilizes `generateMetadata()` to query database-level SEO configurations (title tags, meta descriptions, target keywords, robots rules, canonical URLs, and OpenGraph parameters).
- **JSON-LD Schema Integration**: The layout files read custom Schema markup from the database and inject it as structured data script tags using the `<RenderSchema />` component.
- **CMS Control**: Admins can edit keywords, descriptions, and schemas in real-time inside the **Page Specific SEO** dashboard in the CMS without code redeployments.

---

## 🍪 Cookie Consent Banner

A persistent, responsive **Cookie Consent Banner** is rendered inside the root application layout:

- **Brand Styling**: The "Accept All" CTA buttons use the designated brand blue (`#394A8D`) with light opacity dropshadow glows on hover state.
- **Dismiss Control**: Integrated a close (cross) button at the top-right corner using a clean, accessible SVG format, allowing users to close the overlay instantly.
- **Persistent Preferences**: Saves consent configurations inside local storage (`localStorage`) so that the banner does not reappear on subsequent page navigations once accepted, rejected, or closed.

---

## 💻 Developer Setup

Follow the steps below to serve the frontend locally:

### 1. Requirements
- **Node.js**: `18.x` or later.
- **Package Manager**: `npm` (v9.x or later).

### 2. Setup Environment Variables
Copy the template `.env.example` file to create your `.env.local` file in the root directory and configure the variables:
```bash
cp .env.example .env.local
```
```env
# The base URL of the running CMS server (Local or Production)
NEXT_PUBLIC_CMS_API_URL=http://localhost:3001

# The default contact email referenced across the application and components
NEXT_PUBLIC_CONTACT_EMAIL=info@sevenstarsatmb.co.uk
```

| Variable Name | Description | Default Value (Local) |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CMS_API_URL` | Base URL of the API gateway providing dynamic page config and menu hydration. | `http://localhost:3001` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Unified email address for notifications and display references. | `info@sevenstarsatmb.co.uk` |

### 3. Install Dependencies
```bash
npm install
```

### 4. Serve Locally
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 5. Production Build
Build and optimize the production bundle:
```bash
npm run build
npm run start
```
