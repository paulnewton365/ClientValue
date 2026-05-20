// Primary button. Ink fill, paper text, all-caps tracked label,
// subtle lift on hover. The right CTA treatment for editorial work.

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  arrow = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="hover-lift group inline-flex items-center gap-3 px-9 py-4 font-sans text-sm font-semibold uppercase tracking-[0.18em] bg-ink text-paper rounded-sm hover:bg-ink-soft disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{children}</span>
      {arrow ? (
        <span className="nudge inline-block" aria-hidden>
          →
        </span>
      ) : null}
    </button>
  );
}
