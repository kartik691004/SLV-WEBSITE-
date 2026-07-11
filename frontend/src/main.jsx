import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DataProvider } from './DataContext.jsx'
import './style.css'

// ── Lenis smooth scroll ──────────────────────────────────────────────────────
// Initialized once at app root; prefers-reduced-motion disables smoothing
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenisInstance = null;
if (!prefersReducedMotion) {
  import('lenis').then(({ default: Lenis }) => {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }).catch(() => {
    // Lenis failed to load — no-op, native scroll takes over
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
)
