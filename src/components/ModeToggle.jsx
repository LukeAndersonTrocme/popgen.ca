'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ModeToggle() {
  const [mode, setMode] = useState('system');

  const resolve = (m) => {
    // SSR guard
    if (typeof window === 'undefined') return 'light';
    if (m === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return m;
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('color-mode') || 'system';
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const theme = resolve(mode);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('color-mode', mode);
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
      {resolve(mode) === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
