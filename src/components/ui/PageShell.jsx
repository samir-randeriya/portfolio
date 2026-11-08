import React from 'react';

export function PageShell({ children, className = '' }) {
  return <div className={`page-shell ${className}`}>{children}</div>;
}

export function Section({ id, children, className = '', ruled = true }) {
  return (
    <section
      id={id}
      className={`section-block ${ruled ? 'section-rule' : ''} ${className}`}
    >
      <PageShell>{children}</PageShell>
    </section>
  );
}
