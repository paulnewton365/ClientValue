// Text input field. Properly bordered so it reads as a field, not a divider.
// Uses the warm editorial palette: paper-tint fill, rule-soft border,
// ink border on focus.

export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  optional = false,
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <label
          htmlFor={id}
          className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted"
        >
          {label}
          {optional ? (
            <span className="ml-2 text-ink-muted/60 normal-case tracking-normal italic font-normal">
              optional
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        id={id}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 transition-colors focus:border-ink focus:bg-paper-tint/70 hover:bg-paper-tint/60"
      />
    </div>
  );
}
