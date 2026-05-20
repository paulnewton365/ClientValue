// Antenna Group design system. Tailwind preset
// Chartreuse accent. Used as fill behind ink text where contrast is strong.
// For accent-as-text on paper backgrounds, use `accent-deep`.

module.exports = {
  theme: {
    extend: {
      colors: {
        paper: "#F6F2E9",
        "paper-tint": "#EEE8DA",
        ink: "#15171A",
        "ink-soft": "#4A4D52",
        "ink-muted": "#85857F",
        rule: "#9C9079",
        "rule-soft": "#C7BFA8",
        // Chartreuse fill. Excellent contrast (~12.5:1) against ink text on top.
        // Bad as text on paper. Bad as text on white. Only ever as a FILL.
        accent: "#DDE32F",
        // Lighter chartreuse for non-dominant chart fills and soft surfaces.
        "accent-soft": "#ECEE9C",
        // Darker chartreuse, for the rare case where we need accent text.
        // Passes WCAG AA (~4.8:1) on paper background.
        "accent-deep": "#5E6A12",
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
        wide: "48rem",
      },
      letterSpacing: {
        tightish: "-0.018em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
};
