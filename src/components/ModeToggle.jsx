'use client';
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import sunMoonAnim from '../assets/lottie/sun-moon.json';

export default function ModeToggle() {
  const [mode, setMode] = useState('system');
  const containerRef = useRef(null);
  const animRef = useRef(null);

  const resolveMode = (m) => {
    if (typeof window === 'undefined') return 'light';
    if (m === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return m;
  };

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined'
      ? localStorage.getItem('color-mode') || 'system'
      : 'system';
    setMode(stored);
  }, []);

  useEffect(() => {
    const theme = resolveMode(mode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('color-mode', mode);
    }
    if (containerRef.current) {
      if (!animRef.current) {
        animRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: sunMoonAnim,
        });
      }
      if (theme === 'dark') {
        animRef.current.playSegments([0, 30], true);
      } else {
        animRef.current.playSegments([30, 0], true);
      }
    }
  }, [mode]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() =>
        setMode((prev) =>
          prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'
        )
      }
    >
      <div ref={containerRef} className="w-6 h-6" />
      <span className="sr-only">Dark mode toggle</span>
    </button>
  );
}