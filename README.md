# VELOCITY X — Feel the Motion. Control the Experience.
### Product Requirements Document v2.0 (Full 3D Edition)
*By @Prince singh kushwah*

A cinematic, scroll-directed 3D automotive campaign engineered with **Next.js (App Router)**, **Three.js**, **React Three Fiber (R3F)**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

Designed for 60 fps rendering on desktop, responsive performance on mobile, and automated static export deployment to **GitHub Pages**.

🔗 **Live Deployment:** [https://princekushwah2611.github.io/VELOCITY-X/](https://princekushwah2611.github.io/VELOCITY-X/)  
📁 **GitHub Repository:** [https://github.com/princekushwah2611/VELOCITY-X](https://github.com/princekushwah2611/VELOCITY-X)

---

## 🏎️ What Changed in v2.0

| Area | v1.0 | v2.0 (Full 3D Edition) |
| :--- | :--- | :--- |
| **Car Visual** | 2D transparent PNG | Real-time 3D hypercar rendered in WebGL with MeshPhysicalMaterial clearcoat |
| **Camera** | Flat static viewport | Scroll-directed camera rig: orbit, dolly, tracking shots, low-angle detail |
| **Scroll Engine** | Single pinned tween | 5-Chapter master timeline synchronizing camera, vehicle, lighting, and DOM |
| **Interaction** | Scroll only | Scroll scrub, pointer parallax, drag-to-orbit, bespoke paint livery switcher |
| **Audio** | Silent | Synthesized Web Audio twin-turbo engine hum reactive to scroll velocity |
| **Rendering** | CSS only | Hardware-accelerated Three.js render loop, dynamic lime rim lighting |
| **Quality Control**| Basic responsive CSS | Device capability gate, DPR capping, and graceful Static fallback |

---

## 🎬 5-Chapter Scroll Choreography

The hero is a pinned stage with a scrubbed master timeline driving five distinct chapters:

1. **Chapter 01 // IGNITION (0.00 – 0.20)**
   - Front three-quarter angle with slow dolly-in.
   - Headlights fade on and electric lime rim lighting ramps up.
   - Initial headline (`WELCOME ITZFIZZ`) and statistics reveal, then gently fade as drive engages.

2. **Chapter 02 // LAUNCH (0.20 – 0.45)**
   - Camera swings to a dynamic side-profile tracking shot.
   - Vehicle accelerates across frame with synchronized axle wheel spin.
   - Speed HUD counts up from 0 to 348 km/h.

3. **Chapter 03 // AERO LAB (0.45 – 0.65)**
   - Low-angle orbit around front wheel, carbon splitter, and NACA ducts.
   - Telemetry callouts reveal active downforce (620 kg) and torsional stiffness (50,000 Nm/deg).

4. **Chapter 04 // REVEAL (0.65 – 0.85)**
   - Sweeping orbit to rear three-quarter; brake lightblades flare.
   - Interactive paint switcher appears (Electric Lime, Stealth Carbon, Apex White, Rosso Corsa, Liquid Chrome).
   - Drag-to-orbit enabled with spring return.

5. **Chapter 05 // RELEASE (0.85 – 1.00)**
   - High wide cinematic shot as lighting settles into quiet blue-black.
   - Hero smoothly unpins and transitions into the below-the-fold statement section.

---

## 🛠️ Technology Stack & Zero-Rerender Architecture

- **Next.js 14 (App Router)**: Static site generation and export (`output: 'export'`).
- **Three.js & @react-three/fiber (R3F)**: Declarative WebGL scene graph.
- **GSAP 3 & ScrollTrigger**: Scroll scrubber and master pinning timeline.
- **Lenis**: Inertial smooth scroll linked directly to GSAP's ticker (`lagSmoothing(0)`).
- **Web Audio API**: Real-time synthesized engine harmonics without external audio file bloat.
- **Tailwind CSS**: Dark automotive design system (`#050505` void, `#c6ff00` electric lime).

> **Integration Rule:** GSAP owns the scroll timeline and writes to a shared mutable progress store (`lib/progressStore.js`). R3F reads from this store in `useFrame` and updates Three.js objects directly. React state is **never** re-rendered during scrolling, guaranteeing smooth 60 fps scrub.

---

## 📁 Project Structure

```text
VELOCITY X/
├── app/
│   ├── layout.jsx              # Viewport, metadata, typography
│   ├── page.jsx                # Page composition & coordinate wrapper
│   └── globals.css             # Design tokens (--bg: #050505, --accent: #c6ff00)
├── components/
│   ├── dom/
│   │   ├── Navbar.jsx          # Header with live scroll HUD
│   │   ├── HeroSection.jsx     # Pinned 5-chapter master timeline
│   │   ├── StatsCard.jsx       # Telemetry metrics cards (58%, 23%, 27%, 40%)
│   │   ├── ChapterHud.jsx      # Chapter counter & live speed readout
│   │   ├── PaintSwitcher.jsx   # Accessible bespoke paint livery switcher
│   │   ├── SoundToggle.jsx     # Engine synthesizer mute toggle
│   │   ├── IntroSection.jsx    # Below-the-fold statement & blueprint
│   │   └── Loader.jsx          # Branded asset preloader
│   ├── three/
│   │   ├── SceneCanvas.jsx     # Master WebGL Canvas with pointer tracking
│   │   ├── CarModel.jsx        # 3D Hypercar with clearcoat paint & spinning wheels
│   │   ├── CameraRig.jsx       # Damped camera keyframe interpolator
│   │   ├── Lights.jsx          # Key light & dynamic lime rim light
│   │   └── Floor.jsx           # Matte ground plane with cyber grid
│   └── system/
│       ├── CapabilityGate.jsx  # WebGL & reduced-motion fallback switch
│       └── SmoothScroll.jsx    # Unified Lenis + ScrollTrigger ticker
├── lib/
│   ├── content.js              # Centralized copy, stats, and chapters
│   ├── scrollConfig.js         # 5-chapter camera and car keyframes
│   ├── progressStore.js        # Shared mutable progress ref
│   ├── audioEngine.js          # Web Audio oscillator synthesizer
│   └── capabilities.js         # Device tier & WebGL detector
├── public/
│   ├── .nojekyll               # Preserves _next/ static chunks on GitHub Pages
│   └── images/                 # Optimized visual assets
└── .github/workflows/
    └── deploy.yml              # Automated GitHub Pages CI/CD pipeline
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test production static export
npm run build
```

---

## 🌐 GitHub Pages Deployment

The project is pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat(v2.0): implement full 3D real-time scene with R3F and GSAP"
   git push origin main
   ```
2. **Enable GitHub Pages:**
   - In GitHub Settings &rarr; **Pages**, select **GitHub Actions** as the source.
   - The workflow automatically runs static export with `NEXT_PUBLIC_BASE_PATH=/VELOCITY-X`.

---

## 📄 Licensing & 3D Attribution

- **Codebase:** MIT &copy; 2026 VELOCITY X. Engineered by Prince Singh Kushwah.
- **3D Asset Architecture:** Original procedural automotive geometry built in Three.js / CC0 Public Domain.
