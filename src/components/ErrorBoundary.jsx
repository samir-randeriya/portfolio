import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="page-shell py-12 font-mono text-sm text-ink-dim">
            This section failed to load. Refresh the page.
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
