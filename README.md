# NEXUS — 3D Digital Experience Template

> A premium, cinematic Next.js template for creative agencies, digital studios, product launches, portfolios, and modern brands.

NEXUS is designed to feel like an interactive digital experience rather than a conventional website. It combines real-time 3D, motion, typography, responsive layouts, and performance-minded rendering into a polished starter for high-end web projects.

![Uploading Screenshot 2026-09-05 163441.png…]()


## ✦ Highlights

- **Real-time 3D** powered by Three.js and React Three Fiber
- **Cinematic motion** with GSAP and ScrollTrigger
- **Interactive hero core** with mouse-responsive rotation and depth
- **Custom cursor** with interactive hover behavior
- **Animated loading sequence** and page-entry choreography
- **Interactive capabilities showcase**
- **Technology section** with live WebGL visuals
- **Scroll-driven manifesto and process sections**
- **Responsive desktop and mobile navigation**
- **Lazy-mounted 3D sections** to avoid unnecessary GPU work before they enter the viewport
- **Production-ready Next.js App Router architecture**
- **SEO metadata** and accessible focus states

## ⚡ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework |
| React 19 | UI architecture |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling and responsive layout |
| Three.js | Real-time 3D rendering |
| React Three Fiber | React renderer for Three.js |
| React Three Drei | 3D helpers and abstractions |
| React Three Postprocessing | Bloom, noise and vignette effects |
| GSAP | Motion and scroll animation |
| Lenis | Smooth-scroll foundation |

## 🚀 Getting Started

### 1. Clone

```bash
git clone https://github.com/harshitdev-wq/nexus-3d-digital-template.git
cd nexus-3d-digital-template
```

### 2. Install

```bash
npm install
```

### 3. Develop

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## 🧪 Production Checks

Build the production version:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

The project has been validated with a successful Next.js production build before release.

## 🗂️ Project Structure

```text
.
├── app/
│   ├── components/
│   │   ├── Contact.tsx
│   │   ├── Cursor.tsx
│   │   ├── Loader.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Navbar.tsx
│   │   ├── Process.tsx
│   │   ├── Showcase.tsx
│   │   └── Technology.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Brand & Content

- **Brand, navigation and CTA labels** → `Navbar.tsx`
- **Hero copy and CTA links** → `page.tsx`
- **Global atmosphere, gradients, noise and responsive rules** → `globals.css`
- **SEO title, description and social metadata** → `layout.tsx`
- **Capabilities and technology content** → `Showcase.tsx` and `Technology.tsx`

### 3D Experience

The primary hero object lives inside `Core()` in `page.tsx`.

You can customize its:

- Geometry
- Materials
- Orbit rings
- Lighting
- Sparkles
- Post-processing
- Camera position
- Mouse interaction

### Sections

The site is componentized so individual sections can be edited, reordered, removed, or reused without rewriting the entire page.

## ⚙️ Performance Notes

NEXUS intentionally keeps the visual layer ambitious while avoiding unnecessary rendering:

- Lower-page WebGL scenes are mounted near the viewport using `IntersectionObserver`.
- 3D experiences are isolated in dedicated Canvas scenes.
- GSAP handles most UI motion instead of relying on large numbers of continuous DOM animations.
- Mobile-specific CSS reduces layout pressure on smaller screens.

Performance will vary with the user's GPU, display resolution, browser, and device. Heavy 3D and post-processing effects can be adjusted for lower-powered devices when necessary.

## 🌐 Deployment

NEXUS can be deployed anywhere that supports Next.js.

### Vercel

1. Import the GitHub repository into Vercel.
2. Select **Next.js** as the framework when prompted.
3. Use the default install/build settings unless you have customized the project.
4. Deploy.

Before launching, replace the placeholder production URL in `layout.tsx` with your actual domain.

## 🔐 Copyright & Usage Warning

**© 2026 NEXUS Digital Systems. All rights reserved.**

This repository is published for **demonstration, portfolio, development, and evaluation purposes**. No open-source license is granted by default.

Unless you have received explicit written permission or a separate commercial license, you may **not**:

- Redistribute this source code or substantial portions of it.
- Re-upload the template as a free or paid template under your own name.
- Sell, sublicense, or bundle the source as a competing website template.
- Claim the original design or source code as your own work.
- Remove or alter copyright and ownership notices when redistributing the source.

A purchased or separately licensed copy may be subject to additional terms. Any commercial license should be obtained directly from the copyright holder and should define the permitted use, redistribution rights, and number of end products allowed.

**Important:** Viewing, cloning, or studying a public repository does not by itself grant commercial redistribution rights.

## 📄 License Status

**License:** Proprietary / All Rights Reserved

This repository intentionally does **not** include an OSI-approved open-source license such as MIT, Apache-2.0, or GPL. Until a separate license is provided, the copyright holder retains all rights not expressly granted.

## 👤 Author

**Harshit Dev**  
GitHub: [@harshitdev-wq](https://github.com/harshitdev-wq)

## ⭐ Support

If you like the project, star the repository and follow future releases.

---

**NEXUS / DIGITAL SYSTEMS**  
*Built for what’s next.*
