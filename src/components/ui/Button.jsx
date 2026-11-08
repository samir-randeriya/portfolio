import React from 'react';

const variants = {
  primary:
    'bg-accent text-on-accent border-accent hover:brightness-110',
  secondary:
    'bg-surface text-ink-bright border-border-strong hover:border-accent hover:text-accent',
  ghost:
    'bg-transparent text-ink-dim border-transparent hover:text-ink-bright hover:bg-surface-2',
};

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <Comp
      className={`
        relative inline-flex items-center justify-center gap-2
        min-h-[44px] px-[18px] py-3
        font-mono text-[13px] sm:text-sm font-medium whitespace-nowrap
        border rounded-md
        transition-[border-color,background-color,color,filter] duration-200
        disabled:opacity-50 disabled:pointer-events-none
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
        ${variants[variant] || variants.primary}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Comp>
  );
}
