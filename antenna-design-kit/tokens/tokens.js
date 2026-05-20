// Antenna Group editorial design system
// Tokens for the warm-editorial aesthetic used across Anterix Brand Foundation Study.
// Drop this file into any React/Next.js project, import what you need.

export const tokens = {
  // ---------------------------------------------------------------
  // COLOR
  // Warm editorial palette. Paper base, ink primary, single terracotta accent.
  // ---------------------------------------------------------------
  colors: {
    paper: "#F6F2E9",       // body background, cream paper
    paperTint: "#EEE8DA",   // input field fill, slight inset
    ink: "#15171A",         // primary text, primary actions
    inkSoft: "#4A4D52",     // secondary text, body copy
    inkMuted: "#85857F",    // tertiary text, eyebrows, labels
    rule: "#9C9079",        // strong dividers, section borders
    ruleSoft: "#C7BFA8",    // soft dividers, input borders
    accent: "#B85C3B",      // single terracotta accent, used sparingly
    accentSoft: "#E9C9B5",  // accent tint for hover/highlight
  },

  // ---------------------------------------------------------------
  // TYPOGRAPHY
  // Two families, used in tension: serif for editorial display moments,
  // sans for everything structural and functional.
  // ---------------------------------------------------------------
  typography: {
    families: {
      // Variable serif. Use for hero h1, question prompts, the editorial voice.
      // Free, on Google Fonts. https://fonts.google.com/specimen/Fraunces
      display: '"Fraunces", Georgia, serif',

      // Use for section heads, body, inputs, buttons, navigation.
      // Free, on Google Fonts. https://fonts.google.com/specimen/Inter
      sans: '"Inter", Arial, sans-serif',
    },

    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Use cases observed in the brand foundation study:
    scales: {
      heroDisplay: {     // Welcome page h1
        fontFamily: "display",
        size: { mobile: "2.5rem", desktop: "3.75rem" },     // text-4xl / text-6xl
        lineHeight: 1.02,
        tracking: "-0.02em",                                 // tightish
        textWrap: "balance",                                 // prevent orphans
      },
      sectionHeading: {  // Section h2 in form
        fontFamily: "sans",
        weight: "black",
        size: { mobile: "1.5rem", desktop: "1.875rem" },     // text-2xl / text-3xl
        textTransform: "uppercase",
        tracking: "-0.01em",
        lineHeight: 1.1,
      },
      questionPrompt: {  // Question h3 in form
        fontFamily: "display",
        size: { mobile: "1.25rem", desktop: "1.5rem" },      // text-xl / text-2xl
        lineHeight: 1.4,
      },
      eyebrow: {         // Labels, section numbers, "01 of 09"
        fontFamily: "sans",
        weight: "semibold",
        size: "0.625rem",                                    // text-[10px]
        textTransform: "uppercase",
        tracking: "0.22em",
      },
      body: {            // Helper text, paragraphs
        fontFamily: "sans",
        size: "0.875rem",                                    // text-sm
        lineHeight: 1.625,                                   // leading-relaxed
        textWrap: "pretty",
      },
    },
  },

  // ---------------------------------------------------------------
  // SPACING & LAYOUT
  // Tailwind defaults plus a few specific tokens we use repeatedly.
  // ---------------------------------------------------------------
  spacing: {
    contentMaxWidth: "48rem",        // max-w-3xl, comfortable read measure
    bodyTextMaxWidth: "72ch",        // text wrap point
    pagePadding: { mobile: "1.5rem", desktop: "2.5rem" },
    sectionGap: "6rem",              // space-y-24 between sections
  },

  // ---------------------------------------------------------------
  // ANIMATION
  // Slow, considered. Editorial pace, not app pace.
  // ---------------------------------------------------------------
  motion: {
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", // soft deceleration
    durations: {
      fast: "0.2s",
      base: "0.4s",
      slow: "0.7s",
      slower: "0.9s",
    },
    revealStagger: ["60ms", "180ms", "320ms", "480ms", "640ms", "800ms"],
  },

  // ---------------------------------------------------------------
  // BRAND ASSETS
  // ---------------------------------------------------------------
  assets: {
    logoSvg:
      "https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg",
    websiteUrl: "https://antennagroup.com",
    favicon: "https://www.antennagroup.com/favicon.ico",
  },
};

export default tokens;
