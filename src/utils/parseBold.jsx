export function parseBold(text, className = 'text-accent font-semibold') {
  if (!text) return null;
  return text.split('**').map((part, i) =>
    i % 2 === 0 ? part : <strong key={i} className={className}>{part}</strong>
  );
}
