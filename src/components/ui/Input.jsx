import React from 'react';

const base =
  'w-full bg-bg border border-border-strong rounded-md py-[11px] px-[14px] font-sans text-[15px] text-ink-bright placeholder:text-ink-faint transition-[border-color,box-shadow] outline-none focus:border-accent focus:shadow-[0_0_0_1px_var(--accent)] focus-visible:border-accent focus-visible:shadow-[0_0_0_1px_var(--accent)] min-h-[44px]';

export function Input({ className = '', label, id, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block font-mono text-[11px] tracking-widest uppercase text-ink-dim">
          {label}
        </label>
      )}
      <input id={id} className={`${base} ${className}`} {...props} />
    </div>
  );
}

export function Textarea({ className = '', label, id, rows = 5, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block font-mono text-[11px] tracking-widest uppercase text-ink-dim">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`${base} min-h-[120px] resize-y ${className}`}
        {...props}
      />
    </div>
  );
}
