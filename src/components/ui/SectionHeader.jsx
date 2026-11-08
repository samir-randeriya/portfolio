import React from 'react';

export default function SectionHeader({
  number,
  label,
  title,
  path,
  meta,
  children,
  className = '',
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          {number && <span className="text-accent">{number}</span>}
          {label && <span className="text-ink-dim">{label}</span>}
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
          {path && <span>{path}</span>}
          {meta != null && meta !== false && <span className="inline-flex items-center">{meta}</span>}
        </div>
      </div>
      {title && (
        <h2 className="text-title font-semibold text-ink-bright tracking-tight max-w-3xl">
          {title}
        </h2>
      )}
      {children && (
        <div className="mt-4 text-ink-dim text-base sm:text-[17px] leading-relaxed max-w-2xl">
          {children}
        </div>
      )}
    </div>
  );
}
