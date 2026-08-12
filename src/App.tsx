import { lazy, Suspense, useState } from 'react';
import { ErrorBoundary } from '@/components/system/ErrorBoundary';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { PageLoader } from '@/components/layout/PageLoader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { SignatureDishes } from '@/components/sections/SignatureDishes';
import { InteractiveMenu } from '@/components/sections/InteractiveMenu';
import { Gallery } from '@/components/sections/Gallery';
import { OrderOnline } from '@/components/sections/OrderOnline';
import { Reservation } from '@/components/sections/Reservation';
import { Contact } from '@/components/sections/Contact';

// Testimonials pulls in Swiper, one of the heavier third-party dependencies,
// for a single below-the-fold section — split it into its own chunk instead
// of paying for it in the initial bundle.
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((module) => ({ default: module.Testimonials })),
);

function App() {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  return (
    <ErrorBoundary>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-accent focus:px-4 focus:py-3 focus:font-numeric focus:text-xs focus:uppercase focus:tracking-wide focus:text-hero-ink"
      >
        Skip to main content
      </a>

      <SmoothScrollProvider>
        <PageLoader onComplete={() => setIsLoaderComplete(true)} />
        <Navbar />

        <main id="main-content">
          <Hero startAnimation={isLoaderComplete} />
          <About />
          <WhyChooseUs />
          <SignatureDishes />
          <InteractiveMenu />
          <Gallery />
          <OrderOnline />
          <Reservation />
          <Suspense fallback={<div className="min-h-[600px] bg-bg-alt" aria-hidden="true" />}>
            <Testimonials />
          </Suspense>
          <Contact />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
}

export default App;
