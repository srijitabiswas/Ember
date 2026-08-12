# EMBER — Modern Mediterranean & European Fine Dining

A premium, editorial-style restaurant website built with **React 19, TypeScript, Vite, Tailwind CSS v4, GSAP (ScrollTrigger + SplitText) and Lenis** smooth scroll. Built as a portfolio piece: a real restaurant site's worth of content (menu, reservations, gallery, reviews) delivered with cinematic, scroll-driven storytelling.

## Quick Start

Requires **Node.js ≥ 20.19** (or ≥ 22.12).

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
npm run build      # type-check (tsc -b) then production build to dist/
npm run preview    # preview the production build locally
npm run lint        # ESLint (flat config, TypeScript + a11y rules)
npm run lint:fix    # ESLint with automatic fixes
npm run type-check  # tsc -b --noEmit only
```

> This project was written in a sandboxed environment with no package-registry access, so it has **not** been through an actual `npm install && npm run build` cycle. Every file was written and cross-checked by hand (import paths, exports, Tailwind tokens, etc. — see *Honest Limitations* below), but please run a build locally and open an issue-to-self if anything surfaces; it's the one step I genuinely could not perform for you.

## Tech Stack & Key Decisions

| Concern | Choice | Why |
|---|---|---|
| Build tool | Vite 8 | Fast dev server, native ESM, first-class TS support |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | CSS-first config (see `src/index.css`) — no `tailwind.config.js` needed in v4 |
| Scroll animation | GSAP 3 + ScrollTrigger + SplitText | Free since GSAP 3.13 (formerly paid "Club GreenSock" plugins) |
| React/GSAP glue | `@gsap/react`'s `useGSAP()` | Handles `gsap.context()` + cleanup automatically; the officially recommended pattern |
| Smooth scroll | Lenis, synced to the GSAP ticker | Standard documented integration (`src/components/providers/SmoothScrollProvider.tsx`) |
| Micro-interactions | Motion (`motion/react`, formerly "Framer Motion") | Mobile menu, menu/gallery filter transitions, lightbox |
| Forms | React Hook Form | Reservation, Contact, Newsletter — native validation rules, no schema library needed for 3 small forms |
| Carousel | Swiper | Testimonials only — lazy-loaded (see below) so it isn't in the initial bundle |
| TypeScript | `^5.9`, **not** the new TS 7 line | `typescript-eslint` doesn't support TS 7 yet at time of writing; 5.9 keeps the whole toolchain compatible |

Only one non-obvious architectural note: `Testimonials` is the sole consumer of Swiper, so it's `React.lazy()`-loaded from `App.tsx` behind a `Suspense` boundary — a deliberate, narrow use of code-splitting rather than splitting every section.

## Project Structure

```
src/
├─ components/
│  ├─ ui/            Reusable primitives: Button, Container, SectionHeading,
│  │                  SplitReveal, RevealImage, Counter, FormField (floating
│  │                  labels), Badge, BrandMark, ResponsiveImage, icons.tsx
│  ├─ layout/         Navbar, MobileMenu, Footer, PageLoader
│  ├─ sections/       The 10 page sections (Hero, About, WhyChooseUs, …)
│  ├─ providers/      SmoothScrollProvider (Lenis + GSAP ticker + context)
│  └─ system/         ErrorBoundary
├─ hooks/             usePrefersReducedMotion, useActiveSection,
│                      useNavbarScrollState, useLockBodyScroll
├─ animations/         gsapConfig.ts — the ONE place GSAP plugins register
├─ data/               Menu items, dishes, gallery, testimonials, stats…
├─ constants/           site.ts — brand, nav, contact info, hours (single source of truth)
├─ types/               Shared domain interfaces
└─ lib/                 utils, validators, api.ts (submission-handler stubs)
```

Every section renders its own `<section id="…">`; `src/constants/site.ts#SECTION_IDS` is the one place those ids are defined, so the Navbar, footer links, and `scrollTo()` calls can't drift out of sync with each other.

## Design System

Defined entirely in `src/index.css` via Tailwind v4's `@theme` block — no separate config file.

- **Hero background** `#111111` · **Primary background** `#EEF2E8` · **Alt background** `#F8F8F3` · **Card surface** `#E3E8DD`
- **Primary accent** (olive) `#5F6F52` · **Secondary accent** (clay) `#A67C52`
- **Primary text** `#202020` · **Secondary text** `#666666`
- **Headings** Playfair Display · **Accent/italic** Cormorant Garamond · **Body** Inter · **Numbers/labels** Space Grotesk

## Images & Video

Every image slot renders through one shared component, `src/components/ui/ResponsiveImage.tsx`: pass it a real `src` and it renders your photo; leave `src` empty and it renders tasteful, on-brand placeholder art (a duotone gradient + a line icon) instead of a broken-image icon. **Nothing in the shipped site can show a broken image**, regardless of what's below.

The Hero, About, Reservation, all 6 Signature Dishes, the matching Menu entries, and 12 of 15 Gallery photos are wired to real, verified photography — hotlinked from Unsplash (free for commercial use under the [Unsplash License](https://unsplash.com/license), no attribution required) via `unsplashUrl()` in `src/lib/utils.ts`. Each URL was individually sourced and confirmed against a real Unsplash photo page rather than guessed, but hotlinking someone else's CDN is still a scaffold-stage convenience, not a production practice — for a real deployment:

1. Download/license your own photography (or commission real shots of the actual food/space).
2. Self-host it (`public/images/…`) so the site isn't dependent on Unsplash's uptime and so you can serve properly optimized/responsive formats (AVIF/WebP).
3. Swap the `image` / `src` field for the relevant entry in `src/data/dishes.ts`, `menu.ts`, `gallery.ts`, or the inline `<ResponsiveImage>` calls in `Hero.tsx`, `About.tsx`, `Reservation.tsx`.

The remaining few Gallery slots (`kitchen`/`chef` categories, where a good matching free photo wasn't found) and all Testimonial avatars intentionally still use the placeholder art / initials-monogram treatment — swap those in the same way once you have real shots.

For the **Hero background video**: `Hero.tsx` already renders a real `<video autoPlay muted loop playsInline>` pointed at `public/videos/hero.mp4`; if that file doesn't exist, the `onError` handler quietly hides the `<video>` and the (now-real) background photo shows instead — so the hero looks intentional either way. Add an ~8–15s, muted, compressed (H.264, < 8MB ideally) clip at that path to activate it. Pexels Videos and Coverr both have free, license-friendly footage.

## Forms — please read

`src/lib/api.ts` contains three functions (`submitReservation`, `submitContactMessage`, `subscribeToNewsletter`) that are **explicitly documented stubs**: they simulate latency and always resolve successfully. There is no backend in this project — it's a static frontend, so there is nowhere for a real "secret" API key to safely live in it anyway (see `.env.example`).

Before deploying for real: point those three functions at your own backend endpoint, or a form service (Formspree, Getform, etc.), and keep any credentials server-side. The calling components already handle the failure path (try/catch, an error message, a re-enabled submit button), so wiring in a real, occasionally-failing endpoint needs no other changes.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `address`) and a single `<h1>` → `<h2>` → `<h3>` hierarchy throughout.
- A "Skip to main content" link (visible on focus) as the first tab stop.
- All interactive controls are real `<button>`/`<a>` elements with visible `:focus-visible` rings (see `index.css`); the mobile menu and gallery lightbox trap Escape-to-close and return focus sensibly.
- Every form field has a real, associated `<label>`; errors are announced via `role="alert"` and wired up with `aria-describedby`/`aria-invalid`.
- `prefers-reduced-motion` is respected at two layers: a CSS-level blanket rule in `index.css`, *and* JS-level checks (`usePrefersReducedMotion`) that skip Lenis entirely and simplify/skip GSAP timelines, rather than just speeding them up.

## Performance Notes

- Vendor code is split into logical chunks in `vite.config.ts` (`react`, the GSAP/Lenis/Motion animation stack, `react-hook-form`, `swiper`).
- `Testimonials` (and therefore Swiper) is lazy-loaded.
- Images render through `ResponsiveImage`, which lazy-loads (`loading="lazy"`) everything except explicitly-marked `priority` (above-the-fold) images.
- GSAP animations exclusively transform `transform`/`opacity` (GPU-composited) rather than layout-triggering properties.
- Fonts load via a single batched Google Fonts request with `display=swap`, preconnected.

## Honest Limitations

Being transparent about what could not be done in this environment:

- **No `npm install`/build was run.** No network access was available in the sandbox for package installation. Every file was hand-written and cross-checked (import paths, named exports, Tailwind theme tokens, etc. were all scripted-verified against each other — see the process notes if you're curious — but a real `tsc`/`vite build` run is the one thing I couldn't do). Please run `npm install && npm run build` as your first step and treat any error as a bug report to fix.
- **Photography is hotlinked from Unsplash**, not self-hosted — real, individually-verified images, but still a scaffold-stage convenience rather than a production asset pipeline. See *Images & Video* above.
- **Forms don't actually send anywhere** yet — see *Forms* above.
- The Google Map embed in the Contact section uses a generic "Downtown" query — update `CONTACT.mapEmbedSrc` in `src/constants/site.ts` (or `VITE_GOOGLE_MAPS_EMBED_SRC` in `.env`) with your real address's embed URL.
- Brand details (name, address, phone, hours, menu, prices) are all invented placeholder content for "EMBER" — update `src/constants/site.ts` and `src/data/*.ts`.

## License

MIT — see `LICENSE`. Replace the copyright holder name before publishing.
