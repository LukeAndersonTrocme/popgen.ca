import { useState, useEffect } from 'react';

const THEMES = [
  { id: 'chaos',  label: 'CHAOS',  title: 'comic sans activated (default)' },
  { id: 'neon',   label: 'NEON',   title: 'matrix hacker mode' },
  { id: 'boring', label: 'BORING', title: 'the CSS failed to load' },
];

export default function LukezoneThemeSwitcher() {
  const [current, setCurrent] = useState('boring');

  useEffect(() => {
    // Read from DOM — already set by the anti-FOUC inline script
    const active = document.documentElement.getAttribute('data-theme') || 'boring';
    setCurrent(active);
  }, []);

  const apply = (id) => {
    setCurrent(id);
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('lukezone-theme', id);
  };

  return (
    <div className="lz-theme-switcher" role="group" aria-label="color theme">
      <span className="lz-theme-label">THEME:</span>
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`lz-theme-btn${current === t.id ? ' active' : ''}`}
          onClick={() => apply(t.id)}
          title={t.title}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
