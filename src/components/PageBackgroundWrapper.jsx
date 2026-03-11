/**
 * Global page wrapper — solid dark background only (no grid, orbs, or glow).
 */
export default function PageBackgroundWrapper({ children }) {
  return (
    <div className="page-background-wrapper">
      <div className="page-background-layer" aria-hidden="true" />
      <div className="page-content-wrap">
        {children}
      </div>
    </div>
  );
}
