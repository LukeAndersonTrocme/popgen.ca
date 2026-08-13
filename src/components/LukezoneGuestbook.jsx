import { useEffect, useRef } from 'react';

const THEME_MAP = {
  chaos: 'dark',
  neon: 'transparent_dark',
  boring: 'light',
};

export default function LukezoneGuestbook() {
  const containerRef = useRef(null);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'boring';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'LukeAndersonTrocme/popgen.ca');
    script.setAttribute('data-repo-id', 'R_kgDOOtrdjw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOOtrdj84DDSxg');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', 'Guestbook');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', THEME_MAP[theme] || 'light');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;

    containerRef.current?.appendChild(script);
  }, []);

  // Sync giscus theme when lukezone theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'boring';
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: THEME_MAP[theme] || 'light' } } },
          'https://giscus.app'
        );
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="lz-guestbook" />;
}
