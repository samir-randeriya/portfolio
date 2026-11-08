import React from 'react';

export default function Card({ as: Comp = 'div', className = '', children, ...props }) {
  return (
    <Comp
      className={`
        bg-surface border border-border rounded-lg
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Comp>
  );
}
