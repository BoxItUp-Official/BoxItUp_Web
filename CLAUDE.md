# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Box It Up is a food-waste-reduction app that connects consumers with discounted surprise boxes from local stores. The repository contains **two parallel codebases** that coexist during migration:

1. **Legacy static site** — plain HTML/CSS/JS files (`en.html`, `tw.html`, `cn.html`, `careers_en.html`, `contact_en.html`, `style.css`, `script.js`) served directly from the root.
2. **Next.js app** — App Router project in `app/`, `components/`, and `lib/` — the active development target going forward.

The legacy files are intentionally kept and must not be deleted until the migration is complete and confirmed.

## Development Commands

```sh
npm run dev      # Start Next.js dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint

# Legacy preview (no build needed):
python3 -m http.server 8080
```

## Next.js App Structure

```
app/
  layout.tsx          Root layout: imports style.css + globals.css, mounts NavbarWrapper + ScrollAnimations
  globals.css         Tailwind directives + dark-navbar overrides + active-link style
  page.tsx            / — English home (all sections + footer inline)
  careers/
    page.tsx          /careers
    careers.css       Page-specific styles (imported in page.tsx)
  contact/
    page.tsx          /contact
    contact.css       Page-specific styles
  tw/
    page.tsx          /tw — Traditional Chinese home
  cn/
    page.tsx          /cn — Simplified Chinese home
components/
  Navbar.tsx          'use client' — scroll state, hamburger, lang dropdown, locale detection
  NavbarWrapper.tsx   'use client' — reads pathname, passes dark={true} to Navbar on /careers
  ScrollAnimations.tsx 'use client' — IntersectionObserver for scroll-fade, active nav link, scroll indicator
lib/
  supabase.ts         Browser client (createBrowserClient from @supabase/ssr)
  supabase-server.ts  Server client (createServerClient, reads cookies())
public/
  *.png               All logo/image assets (copied from root for Next.js static serving)
```

## Route Map

| Next.js route | Legacy file         | Lang |
|---|---|---|
| `/`           | `en.html`           | English |
| `/tw`         | `tw.html`           | Traditional Chinese |
| `/cn`         | `cn.html`           | Simplified Chinese |
| `/careers`    | `careers_en.html`   | English |
| `/contact`    | `contact_en.html`   | English |

## CSS Architecture

`style.css` (legacy, imported globally in `app/layout.tsx`) is the primary stylesheet for all existing component classes. Do not modify it for Next.js concerns — use `app/globals.css` for any new global overrides.

`app/globals.css` holds:
- Tailwind `@tailwind base/components/utilities` directives
- `.navbar--dark` overrides (applied on `/careers` via `NavbarWrapper`)
- `.navbar__link.active` style (injected by `ScrollAnimations`)

Page-specific CSS (careers, contact) lives in co-located `.css` files imported by the page. Selectors in those files must **not** use `body.page-name` prefixes — the original `body.careers-page .navbar` pattern is replaced by the `navbar--dark` class approach.

**Color palette**: CSS variables on `:root`, brand accent `--clr-accent: #EB6A00`. Tailwind theme extends with `colors.accent`.

## Navbar & Locale Logic

`Navbar.tsx` derives the active locale and home base URL from `usePathname()`:
- `/` or `/careers` or `/contact` → locale `en`, homeBase `''`
- `/tw*` → locale `tw`, homeBase `/tw`
- `/cn*` → locale `cn`, homeBase `/cn`

Nav links and language-switcher options adjust automatically. The language switcher always navigates to the locale's home page (e.g. `/tw`). Sub-pages in other locales (`/tw/careers` etc.) are not yet implemented.

The `dark` prop on `Navbar` adds `.navbar--dark` to the `<header>`. `NavbarWrapper` sets `dark={pathname === '/careers'}`.

## Scroll Animations

`ScrollAnimations.tsx` is a null-rendering client component mounted in the root layout. On each route change (via `pathname` dependency), it:
1. Queries elements by the hardcoded selector list (`.step-card`, `.value-card`, etc.), adds `data-animate` attribute and staggered `transitionDelay`.
2. Sets up `IntersectionObserver` — adds `.visible` class to trigger CSS transitions.
3. Tracks active section for nav link highlight (`.navbar__link.active`).
4. Manages the `#scrollIndicator` fade-out and click-to-scroll behaviour.

## Supabase

Set credentials in `.env.local` (already gitignored):
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- `lib/supabase.ts` — browser client, use in Client Components
- `lib/supabase-server.ts` — server client (async, reads `cookies()`), use in Server Components and Route Handlers

## Adding a New Locale

1. Create `app/<locale>/page.tsx` — copy the closest existing locale page and translate content.
2. Add the locale to `langGroups` in `components/Navbar.tsx` with the correct `url`.
3. Copy images to `public/` if they differ.
4. Update `Navbar.tsx` locale/homeBase detection if the pathname pattern needs it.
