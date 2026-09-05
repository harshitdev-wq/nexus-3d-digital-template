# NEXUS — 3D Digital Experience Template

> A premium, cinematic Next.js template for creative agencies, digital studios, product launches, and modern brands.

Built to feel more like an interactive experience than a traditional website — combining real-time 3D, motion, typography, and performance-minded architecture.

![NEXUS](https://placehold.co/1600x900/050505/67e8f9?text=NEXUS+%E2%80%94+3D+Digital+Experience)

## ✦ Highlights

- **Real-time 3D** powered by Three.js and React Three Fiber
- **Cinematic motion** with GSAP and ScrollTrigger
- **Interactive hero core** with mouse-responsive rotation and depth
- **Custom cursor** with interactive hover behavior
- **Animated loader** and polished page-entry sequence
- **Interactive capabilities showcase**
- **Technology / stack section** with live WebGL visuals
- **Scroll-driven manifesto and process sections**
- **Responsive navigation and mobile layout**
- **Lazy-mounted 3D sections** to reduce unnecessary GPU work before they enter the viewport
- **Production-ready Next.js App Router structure**
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

### 1. Clone the repository

```bash
git clone https://github.com/harshitdev-wq/nexus-3d-digital-template.git
cd nexus-3d-digital-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## 🧪 Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Lint the project:

```bash
npm run lint
```

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
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Brand

Update the visual identity in the component files and `globals.css`:

- Brand name and navigation labels → `Navbar.tsx`
- Hero copy and CTA → `page.tsx`
- Global atmosphere, noise and responsive rules → `globals.css`
- SEO title, description and Open Graph metadata → `layout.tsx`

### 3D Experience

The main hero object is defined in `page.tsx` inside `Core()`.

You can change:

- Geometry
- Materials
- Orbit rings
- Lighting
- Sparkles
- Bloom intensity
- Mouse interaction
- Camera position

### Sections

The main content is intentionally componentized so sections can be replaced, reordered, or reused independently.

## ⚙️ Performance Notes

NEXUS uses several techniques to keep the visual experience ambitious without rendering every 3D section immediately:

- Lower-page WebGL sections are mounted close to the viewport using `IntersectionObserver`.
- 3D rendering is isolated inside dedicated Canvas scenes.
- Motion is handled primarily through GSAP rather than continuous DOM-heavy effects.
- Mobile-specific CSS reduces layout pressure on smaller screens.

Actual performance will still depend on the user's GPU, display resolution, browser, and device.

## 🌐 Deployment

The project can be deployed to any platform that supports Next.js.

For a typical Vercel deployment:

1. Import the GitHub repository.
2. Keep the framework preset as **Next.js**.
3. Use `npm run build` as the production build command if the platform asks for it.
4. Deploy.

## 📄 License

No open-source license is currently granted with this repository.

The source is intended as a **premium website template / commercial asset**. Do not redistribute or resell the source as your own product without permission from the author.

For commercial licensing, contact the repository owner.

## 👤 Author

**Harshit Dev**

GitHub: [@harshitdev-wq](https://github.com/harshitdev-wq)

## ⭐ Support

If you found the project useful or want to follow future releases, consider starring the repository.

---

**NEXUS / DIGITAL SYSTEMS**  
Built for what’s next.
