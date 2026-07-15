# Jeffrey Castillo — Portfolio

Personal portfolio site for Jeffrey Castillo, Senior Frontend Engineer. Built with Next.js 15, TypeScript strict mode, and Tailwind CSS.

---

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint with next/core-web-vitals
```

Deploys to Vercel with zero configuration. No environment variables required.

---

## Architecture decisions

### Next.js 15 App Router — Server Components by default

Every component is a React Server Component unless it explicitly requires browser APIs. Only `Contact` (form state + `window.location`) uses `"use client"`. This keeps the homepage fully statically generated (`○`) with a 2 kB page JS payload.

### Typed content layer (`lib/content.ts`)

All portfolio data — case studies, skills, courses, person data — lives in a single typed constants file with strict TypeScript interfaces. Updating a project description or adding a new case study never touches component code. The `published: boolean` flag gates what ships without deleting draft content.

### CSS-only animations — no animation library

The integration map in the hero draws its SVG lines via `stroke-dashoffset` animation in `globals.css`. `prefers-reduced-motion: no-preference` is the guard: users who prefer reduced motion see the final static state immediately with no animation at all — not a disabled or broken fallback. This avoids the bundle cost of a motion library for a single orchestrated moment.

### Design tokens via CSS custom properties

Five tokens (`--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`) live in `:root`. Tailwind `extend.colors` maps them so utility classes like `bg-bg` and `text-accent` resolve to the tokens, not hardcoded values. Changing the palette means editing five lines in `globals.css`, not hunting through component files.

### `next/font` for zero layout shift

`Space_Grotesk` and `Inter` are loaded as variable fonts via `next/font/google`, served from the same origin, with `display: swap` and CSS variables (`--font-space-grotesk`, `--font-inter`). No external font request, no CLS from font swap.

---

## Why I built it this way

The brief: get a recruiter to book an interview within 60 seconds.

That dictates every decision. The hero answers the three questions a recruiter has in the first five seconds: *who*, *what they do*, and *whether I can hire them right now*. The integration map is the only decoration — it signals "this person thinks in systems" without a single word of copy.

The case studies follow the same logic: not a card gallery, but structured narratives in a fixed format (context → constraint → built → outcome) that let a hiring manager extract signal fast even when skimming.

Seniority signals are embedded in the *structure*, not claimed in the copy. Writing your own technical design docs, creating backlogs, and making architecture decisions from scratch — those go in "How I Work", not in a hero tagline.

The codebase is written as if an interviewer is reading it — because they are. Server Components by default, justified client boundaries, a typed data layer, CSS animations with a genuine reduced-motion fallback, WCAG-compliant contrast on every color pair. The code is the proof.

---

## TODO before shipping

- [ ] Replace all `https://jeffreycastillo.dev` URLs with your actual domain
- [ ] Add NDA case study details to `lib/content.ts` and set `published: true`
- [ ] Replace `public/vite.svg` with a proper favicon (`public/favicon.ico` or `app/icon.tsx`)
- [ ] Add an `app/icon.tsx` for generated favicon (optional, or use a static PNG)
- [ ] Verify `metadataBase` URL matches your Vercel deployment domain
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
