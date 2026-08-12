import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere below it in the tree so a single
 * broken section (e.g. a bad ScrollTrigger teardown) can't blank the whole
 * page. React error boundaries have no hook equivalent, so this has to stay
 * a class component.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Swap for a real error-monitoring service (Sentry, etc.) before deploying.
    console.error('Uncaught error in component tree:', error, info.componentStack);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
          <p className="font-display text-3xl text-ink">Something went wrong</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            We hit an unexpected error loading this page. Please refresh — if the problem continues, let us know.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-8 bg-accent px-6 py-3.5 font-numeric text-xs uppercase tracking-[0.12em] text-hero-ink transition-colors duration-500 hover:bg-accent-dark"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
