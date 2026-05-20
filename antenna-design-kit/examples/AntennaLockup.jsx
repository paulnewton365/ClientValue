// Antenna lockup. logo plus the "Strategy work by Antenna Group" subtitle.
// Drop this into any project as a starting point for branding.

import tokens from "../tokens/tokens";

export default function AntennaLockup({
  homeHref = "/",
  size = "default", // "default" | "small"
}) {
  const logoHeight = size === "small" ? "h-8" : "h-12";
  const dividerHeight = size === "small" ? "h-6" : "h-8";

  return (
    <div className="flex items-center gap-5">
      <a
        href={homeHref}
        className="block hover-lift"
        aria-label="Antenna Group home"
      >
        <img
          src={tokens.assets.logoSvg}
          alt="Antenna Group"
          className={`${logoHeight} w-auto`}
        />
      </a>
      <span className={`${dividerHeight} w-px bg-rule`} aria-hidden />
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-muted leading-tight">
        Strategy work
        <br />
        by{" "}
        <a
          href={tokens.assets.websiteUrl}
          target="_blank"
          rel="noreferrer"
          className="text-ink-soft hover:text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors"
        >
          Antenna Group
        </a>
      </p>
    </div>
  );
}
