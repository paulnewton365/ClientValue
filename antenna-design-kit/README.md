# Antenna Group Design Kit

The editorial design system used in the Anterix Brand Foundation Study,
extracted for reuse across other Antenna projects.

## What's in here

```
antenna-design-kit/
├── README.md                      You are here
├── tokens/
│   ├── tokens.js                  Design tokens (colors, type, motion, assets)
│   ├── tailwind-preset.js         Drop-in Tailwind v3.4+ preset
│   └── globals.css                Base styles, animations, reduced-motion
└── examples/
    ├── AntennaLockup.jsx          Logo + "Strategy work by Antenna Group"
    ├── TextField.jsx              Proper bordered input field
    └── PrimaryButton.jsx          Ink CTA with hover-lift
```

## Quick start (Next.js or any React + Tailwind project)

**1. Copy the `tokens/` and `examples/` folders into your project.**

**2. Wire up Tailwind.** In your project's `tailwind.config.js`:

```js
const antennaPreset = require("./antenna-design-kit/tokens/tailwind-preset");

module.exports = {
  presets: [antennaPreset],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./antenna-design-kit/examples/**/*.{js,jsx,ts,tsx}",
  ],
};
```

**3. Wire up CSS.** In your `app/globals.css` or `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "../antenna-design-kit/tokens/globals.css";
```

**4. Wire up fonts.** In a Next.js `app/layout.js`:

```jsx
import { Fraunces, Inter } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

In a non-Next project, link them from Google Fonts CDN:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,SOFT@9..144,0..100&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Then set the CSS variables:

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-sans: "Inter", Arial, sans-serif;
}
```

## The design language at a glance

**Two fonts in tension.** Fraunces for the editorial display moments (hero
h1, question prompts). Inter, bold and uppercase with tight tracking, for
section heads and everything structural. Sans does the work; serif does the
voice.

**One accent, used sparingly.** Terracotta `#B85C3B`. Eyebrows on the
welcome page. Hover decorations. Validation states. That's it.

**Two divider weights.** `rule` (`#9C9079`) for structural breaks between
sections. `rule-soft` (`#C7BFA8`) for in-section dividers and field
borders. Never use the same weight twice in adjacent contexts.

**Inputs look like inputs.** Bordered on all four sides, subtle paper-tint
fill, rounded-sm corners, focus state darkens border to ink. Never use
bottom-only borders since they read as dividers.

**Motion is slow.** Editorial pace, not app pace. All easings use
`cubic-bezier(0.2, 0.7, 0.2, 1)`. Reveal animations stagger across 60ms,
180ms, 320ms, 480ms, 640ms, 800ms. Scroll-triggered fades use 0.7 to 0.9s
durations.

**Reduced motion respected.** A `prefers-reduced-motion` media query
disables all animations and shows content immediately. Five lines of CSS.

## Color tokens

| Token         | Hex       | Use case                                   |
|---------------|-----------|--------------------------------------------|
| paper         | `#F6F2E9` | Body background                            |
| paper-tint    | `#EEE8DA` | Input field fill                           |
| ink           | `#15171A` | Primary text, primary actions              |
| ink-soft      | `#4A4D52` | Body copy, secondary text                  |
| ink-muted     | `#85857F` | Tertiary text, eyebrows, labels            |
| rule          | `#9C9079` | Section dividers, strong borders           |
| rule-soft     | `#C7BFA8` | Field borders, in-section dividers         |
| accent        | `#B85C3B` | Single accent, sparing use                 |
| accent-soft   | `#E9C9B5` | Accent tint for highlights                 |

## Typography scales

| Use case          | Family    | Mobile        | Desktop       | Weight | Treatment              |
|-------------------|-----------|---------------|---------------|--------|------------------------|
| Hero h1           | Fraunces  | text-4xl      | text-6xl      | 400    | text-balance, leading-tight |
| Section h2        | Inter     | text-2xl      | text-3xl      | 900    | uppercase, tight tracking |
| Question h3       | Fraunces  | text-xl       | text-2xl      | 400    | tight tracking, snug leading |
| Eyebrow / label   | Inter     | text-[10px]   | text-[10px]   | 600    | uppercase, tracking-[0.22em] |
| Body              | Inter     | text-sm       | text-sm       | 400    | leading-relaxed, text-pretty |

## Brand assets

The Antenna logo is hosted at:

```
https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg
```

Single-color SVG. Scales from favicon size up to hero size. Use the
`AntennaLockup` example as the canonical placement: logo + thin rule +
"Strategy work by Antenna Group" subtitle.

For favicons, point browsers at `https://www.antennagroup.com/favicon.ico`.

## A few principles, learned in practice

1. **Pithy, punchy, declarative.** Cut filler. Watch for "actually",
   "really", "just". they almost always weaken.
2. **No em dashes anywhere.** Period.
3. **Bullets only when the content is genuinely list-like.** Otherwise prose.
4. **Numbered eyebrows everywhere.** "Section 03 of 09", "Question 12 of 15".
   Tabular numerals so they don't shift.
5. **Editorial spacing.** Generous gutters between sections (space-y-24),
   intentional vertical rhythm. Don't crowd.
6. **One accent. One serif moment per page.** Restraint reads as
   confidence.

---

Built alongside the Anterix Brand Foundation Study, May 2026.
Questions: `paul.newton@antennagroup.com`
