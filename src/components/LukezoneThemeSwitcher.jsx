import { useState, useEffect, useRef } from 'react';

const THEME_SPECTRUM = [
  { id: 'boring',    label: 'BORING',    stop: 0 },
  { id: 'terminal',  label: 'TERMINAL',  stop: 1 },
  { id: 'neon',      label: 'NEON',      stop: 2 },
  { id: 'vaporwave', label: 'VAPORWAVE', stop: 3 },
  { id: 'gore',      label: 'GORE',      stop: 4 },
  { id: 'chaos',     label: 'CHAOS',     stop: 5 },
  { id: 'insane',    label: 'INSANE',    stop: 6 },
  { id: 'void',      label: 'VOID',      stop: 7 },
];

const STOP_TO_ID = THEME_SPECTRUM.map(t => t.id);
const ID_TO_STOP = Object.fromEntries(THEME_SPECTRUM.map(t => [t.id, t.stop]));

export default function LukezoneThemeSwitcher() {
  const [stop, setStop] = useState(0);
  const [mirror, setMirror] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Sync initial state from DOM (set by anti-FOUC script)
  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'boring';
    setStop(ID_TO_STOP[activeTheme] ?? 0);
    setMirror(document.documentElement.hasAttribute('data-mirror'));
  }, []);

  const applyTheme = (newStop) => {
    const id = STOP_TO_ID[newStop];
    setStop(newStop);
    document.documentElement.setAttribute('data-theme', id);

    // Persist all themes except void
    if (id !== 'void') {
      localStorage.setItem('lukezone-theme', id);
    }

    // Show toast
    clearTimeout(toastTimer.current);
    setToast({ id, label: THEME_SPECTRUM[newStop].label, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 1500);
  };

  const toggleMirror = () => {
    const next = !mirror;
    setMirror(next);
    if (next) {
      document.documentElement.setAttribute('data-mirror', '');
      localStorage.setItem('lukezone-mirror', '1');
    } else {
      document.documentElement.removeAttribute('data-mirror');
      localStorage.removeItem('lukezone-mirror');
    }
  };

  return (
    <>
      <div className="lz-slider-wrap">
        <span className="lz-slider-label lz-slider-label-left">sane</span>
        <input
          type="range"
          min="0"
          max="7"
          step="1"
          value={stop}
          onChange={(e) => applyTheme(Number(e.target.value))}
          className="lz-slider"
          aria-label="theme sanity level"
        />
        <span className="lz-slider-label lz-slider-label-right">insane</span>
        <button
          className={`lz-mirror-btn${mirror ? ' active' : ''}`}
          onClick={toggleMirror}
          title={mirror ? 'disable mirror' : 'enable mirror'}
          aria-pressed={mirror}
        >
          MIRROR
        </button>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.key}
          className={`lz-toast lz-toast-${toast.id}`}
          onAnimationEnd={() => setToast(null)}
        >
          {toast.label}
        </div>
      )}
    </>
  );
}
