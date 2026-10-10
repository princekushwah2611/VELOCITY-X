# VELOCITY X — Feel the Motion. Control the Experience.

A premium, high-performance scroll-driven automotive landing page engineered with **Next.js (App Router)**, **GSAP & ScrollTrigger**, and **Tailwind CSS**. 

Built for modern browsers and pre-configured for automated **GitHub Pages** deployment via static export.

Inspired by the interaction dynamics of the [ITZFIZZ car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation) reference, elevated with a custom dark editorial luxury aesthetic and real-time kinetic telemetry.

---

## 🏎️ Experience & Features

- **Cinematic Pinned Hero Section (`FR-01`)**
  - Full-screen first viewport with high-contrast editorial typography.
  - Large letter-spaced headline: `WELCOME ITZFIZZ` with character-by-character illumination synchronized to vehicle traversal.
  - Transparent-background McLaren 720S automotive visual positioned along an asphalt and carbon telemetry track.
  - Real-time live HUD speed readout calculating simulated telemetry from scroll velocity (0 to 348 km/h).

- **Intro Animations (`FR-02`)**
  - Page-load reveal animation powered by GSAP with vertical displacement (`y: 35 -> 0`), staggered letter reveals, and restrained cubic easing (`power3.out`).
  - Staggered sequence for all four telemetry metrics cards.
  - Zero layout shift and hardware-accelerated GPU transforms (`will-change: transform`).

- **Scroll-Driven Car Animation (`FR-03`)**
  - Native GSAP ScrollTrigger pinning with scrub synchronization (`scrub: 0.8`).
  - Proportional horizontal vehicle translation across the screen track with subtle aerodynamic elevation changes.
  - Electric lime (`#D6FF5F`) dynamic velocity energy trail expanding behind the rear diffuser.
  - Bidirectional scrub: naturally and smoothly reverses when scrolling upwards.
  - Smooth unpin release leading into the below-the-fold content.

- **Illustrative Demonstration Metrics**
  - **58%** — Increase in pickup point usage
  - **23%** — Reduction in customer phone calls
  - **27%** — Improvement in pickup experience
  - **40%** — Reduction in delivery friction
  - Checkpoint tracking (S-01 to S-04): Cards actively illuminate with electric lime accents as the vehicle crosses their respective track sectors.

- **Below-The-Fold Complementary Sections (`FR-04`)**
  - **Aerodynamic Architecture**: Editorial manifesto with an interactive carbon hypercar side-profile inspection view and hotspot callouts (Ground Venturi, T1000 Monocoque, Active Airbrake).
  - **Telemetry Matrix & Drivetrain Profiles**: Interactive Drive Mode switcher (`TRACK`, `SPORT GT`, `HYPER-KINETIC`, `STEALTH SILENT`) updating live 0-100 km/h, top speed, horsepower, lateral G, downforce, and regenerative braking metrics.

- **Responsive & Accessible Design (`FR-05`)**
  - Optimized for desktop, laptop, tablet, and mobile viewports.
  - Prevents horizontal overflow across all breakpoints.
  - Full support for `prefers-reduced-motion` to ensure an accessible experience without scroll trapping.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** (App Router) | React Framework, static site generation, and export |
| **React 18** | Modular UI components & client-side state |
| **Tailwind CSS 3** | Responsive utility styling & custom automotive color system |
| **GSAP 3** | High-performance animation engine |
| **GSAP ScrollTrigger** | Scroll-synchronized scrub, pinning, and viewport triggers |
| **Lucide React** | Sleek geometric interface icons |
| **GitHub Actions** | Automated CI/CD deployment to GitHub Pages |

---

## 📁 Project Structure

```text
VELOCITY X/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── app/
│   ├── globals.css             # Tailwind directives, grid background, and glow effects
│   ├── layout.jsx              # App layout, viewport settings, and SEO metadata
│   └── page.jsx                # Main page composition
├── components/
│   ├── Navbar.jsx              # Responsive header with live scroll percentage HUD
│   ├── HeroSection.jsx         # Pinned viewport with GSAP scrubbed car animation
│   ├── StatsCard.jsx           # Reusable telemetry statistics card with active states
│   ├── EngineeringSection.jsx  # Complementary aero section with interactive hotspots
│   ├── SpecsSection.jsx        # Drive mode selector and live specs matrix
│   └── Footer.jsx              # Project credits, stack badges, and back-to-top
├── public/
│   ├── .nojekyll               # GitHub Pages compatibility flag (preserves _next/)
│   └── images/
│       ├── mclaren-720s.png    # Transparent top-view McLaren 720S asset
│       └── velocity-x-profile.jpg # Cinematic carbon hypercar profile asset
├── utils/
│   └── assetPath.js            # Path resolver supporting GitHub Pages basePath
├── next.config.mjs             # Static export and configurable basePath settings
├── tailwind.config.js          # Design system: electric lime (#D6FF5F), deep black (#090909)
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Comprehensive documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### 1. Installation

Clone or open the repository directory and install dependencies:

```bash
cd "VELOCITY X"
npm install
```

### 2. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in terminal) in your browser.

### 3. Production Build & Static Export

Generate the static export in the `./out` directory:

```bash
npm run build
```

The exported HTML, CSS, JavaScript, and assets will be output to `./out`.

---

## 🌐 GitHub Pages Deployment Guide

This project is fully configured for automated deployment to **GitHub Pages** using GitHub Actions.

### Step 1: Create a GitHub Repository

1. Initialize git and commit the codebase (if not already done):
   ```bash
   git add .
   git commit -m "feat: complete VELOCITY X scroll-driven automotive website"
   ```
2. Create a new repository on GitHub (e.g., `velocity-x` or `car-scroll-animation`).
3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages in Repository Settings

1. On GitHub, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select:
   - **GitHub Actions**
3. The `.github/workflows/deploy.yml` workflow will automatically trigger on push to `main`.
4. Once completed, your live site will be available at:
   ```text
   https://<YOUR-USERNAME>.github.io/<REPO-NAME>/
   ```

### Base Path Handling

The application dynamically detects the repository name in the GitHub Actions workflow using `NEXT_PUBLIC_BASE_PATH`:
- If deployed to a project repository (`https://username.github.io/repo-name/`), `NEXT_PUBLIC_BASE_PATH` is automatically set to `/repo-name`.
- If deployed to a custom domain or user page (`https://username.github.io/`), `NEXT_PUBLIC_BASE_PATH` remains empty (`""`).
- All image assets and routes utilize `getAssetPath()` to prevent broken paths.

---

## 🧪 Testing & Verification Checklist

- [x] **Hero Section Viewport**: Fills initial viewport with letter-spaced `WELCOME ITZFIZZ` headline.
- [x] **Page Load Intro**: Smooth vertical entry and staggered reveal for headline and metrics.
- [x] **Scroll Synchronization**: Car moves horizontally on scrub with dynamic velocity trail and telemetry updates.
- [x] **Bidirectional Scroll**: Smoothly reverses when scrolling upward.
- [x] **Hero Pin & Release**: Pinned hero releases cleanly into the aerodynamic below-the-fold section.
- [x] **Responsive Layouts**: Tested across mobile, tablet, laptop, and desktop viewports without overflow.
- [x] **Motion Accessibility**: Respects `prefers-reduced-motion` settings.
- [x] **Static Export**: Clean `next build` static export into `./out` with zero warnings.
- [x] **GitHub Pages Compatibility**: Includes `public/.nojekyll`, base path support, and GitHub Actions workflow.

---

## 📄 License

MIT &copy; 2026 VELOCITY X. Developed for frontend development evaluation.
