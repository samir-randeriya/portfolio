import React from 'react';

export default function Badge({ children, className = '', pulse = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1.5
        font-mono text-[11px] sm:text-xs tracking-wide
        text-ink-dim border border-border rounded-full
        bg-surface/60
        ${className}
      `.trim()}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
