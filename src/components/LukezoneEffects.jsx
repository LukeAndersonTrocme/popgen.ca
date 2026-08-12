import { useEffect, useRef, useState } from 'react';

const BANNER_THEMES = new Set(['chaos']);
const CRT_THEMES    = new Set(['neon']);
const SPARKLE_THEMES = new Set(['chaos']);

const SPARKLE_CHARS = ['★', '✦', '✧', '✶', '✸', '✺', '◆', '◇', '✼', '❋'];

const SPARKLE_COLORS = {
  chaos: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff', '#ff6600', '#ff0099'],
};

const BANNERS = {
  chaos: [
    '🎉 YOU ARE THE 1,000,000th VISITOR!! CLICK HERE TO CLAIM YOUR PRIZE!! 🎉',
    '⚠️ YOUR COMPUTER DOES NOT HAVE A VIRUS — CALL 1-800-LUKE-ZONE IMMEDIATELY ⚠️',
    '💾 BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 AT 800×600 RESOLUTION 💾',
    '🌟 FORWARD THIS PAGE TO 10 FRIENDS OR HAVE BAD LUCK FOR 7 YEARS 🌟',
  ],
};

const BANNER_STYLES = {
  chaos: { background: '#00cc00', color: '#ff0000', borderTop: '4px solid #000', borderBottom: '4px solid #000' },
};

const BOOT_LINES = [
  '> INITIALIZING LUKE ZONE SYSTEMS...',
  '> LOADING CODE BASE FROM THAT DEPRECATED GIT REPO... [OK]',
  '> SCANNING FOR VIRUSES............. [OK]',
  '> POPGEN : ACTIVE',
  '> SCANNING FOR VISITORS.............. FOUND: 001,337',
  '> ESTABLISHING UPLINK CONNECTION.......... [OK]',
  '> ALL SYSTEMS NOMINAL.',
  '> WELCOME TO THE ZONE.',
];

export default function LukezoneEffects({ reading = false }) {
  const [banner, setBanner]         = useState(null);
  const [flickering, setFlickering] = useState(false);
  const [bootLines, setBootLines]   = useState([]);
  const [bootDone, setBootDone]     = useState(false);
  const [bootFading, setBootFading] = useState(false);
  const [bootGone, setBootGone]     = useState(false);
  const flickerTimer = useRef(null);

  const exitBoot = () => {
    setBootFading(true);
    setTimeout(() => {
      setBootGone(true);
      try { sessionStorage.setItem('lz-booted', '1'); } catch (_) {}
    }, 700);
  };

  // Boot sequence — once per browser session
  useEffect(() => {
    try {
      if (sessionStorage.getItem('lz-booted')) { setBootGone(true); return; }
      // Skip boot on boring theme
      const t = localStorage.getItem('lukezone-theme');
      if (t === 'boring') { setBootGone(true); return; }
    } catch (_) { setBootGone(true); return; }

    let i = 0;
    const interval = setInterval(() => {
      setBootLines(prev => [...prev, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setBootDone(true);
        setTimeout(exitBoot, 1200);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Cursor sparkle trail — chaos only
  useEffect(() => {
    let lastTime = 0;
    const createSparkle = (x, y, theme) => {
      const el = document.createElement('span');
      const colors = SPARKLE_COLORS[theme] || SPARKLE_COLORS.chaos;
      el.className = 'lz-sparkle';
      el.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
      el.style.fontSize = (8 + Math.random() * 10) + 'px';
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return;
      lastTime = now;
      const theme = document.documentElement.getAttribute('data-theme');
      if (SPARKLE_THEMES.has(theme)) createSparkle(e.clientX, e.clientY, theme);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Periodic banner — suppressed on post pages
  useEffect(() => {
    if (reading) return;
    const showBanner = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (!BANNER_THEMES.has(theme)) return;
      const options = BANNERS[theme] || BANNERS.chaos;
      setBanner({ text: options[Math.floor(Math.random() * options.length)], theme, key: Date.now() });
    };
    const first    = setTimeout(showBanner, 15000);
    const interval = setInterval(showBanner, 35000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, [reading]);

  // CRT flicker — neon only
  useEffect(() => {
    const schedule = () => {
      flickerTimer.current = setTimeout(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (CRT_THEMES.has(theme)) {
          setFlickering(true);
          setTimeout(() => setFlickering(false), 150);
        }
        schedule();
      }, 5000 + Math.random() * 12000);
    };
    schedule();
    return () => clearTimeout(flickerTimer.current);
  }, []);

  return (
    <>
      {/* Boot sequence overlay */}
      {!bootGone && (
        <div
          className="lz-boot-overlay"
          style={{ opacity: bootFading ? 0 : 1 }}
          onClick={exitBoot}
        >
          <div className="lz-boot-terminal">
            {bootLines.map((line, i) => (
              <div key={i} className="lz-boot-line">{line}</div>
            ))}
            {bootDone && (
              <div className="lz-boot-skip lz-blink">[ click to enter ]</div>
            )}
          </div>
        </div>
      )}

      {/* CRT flicker pulse */}
      {flickering && <div className="lz-crt-flicker" aria-hidden="true" />}

      {/* Periodic banner popup */}
      {banner && (
        <div
          key={banner.key}
          className="lz-banner"
          style={{ ...BANNER_STYLES[banner.theme], fontFamily: 'var(--lz-font-body)' }}
          onAnimationEnd={() => setBanner(null)}
        >
          {banner.text}
        </div>
      )}
    </>
  );
}
