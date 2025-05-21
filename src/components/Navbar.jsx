// --- src/components/Navbar.jsx ---
import { useState } from 'react';

export default function Navbar({ locale = 'en' }) {
  const base = locale === 'en' ? '' : '/fr';
  return (
    <nav className="p-4 flex justify-between bg-white dark:bg-slate-900">
      <ul className="flex space-x-6">
        <li><a href={`${base}/`} className="hover:text-cta">{locale === 'en' ? 'Home' : 'Accueil'}</a></li>
        <li><a href={`${base}/research`} className="hover:text-cta">{locale === 'en' ? 'Research' : 'Recherche'}</a></li>
        <li><a href={`${base}/publications`} className="hover:text-cta">Publications</a></li>
      </ul>
      <a href={locale === 'en' ? '/fr/' : '/'} className="font-semibold">
        {locale === 'en' ? 'Français' : 'English'}
      </a>
    </nav>
  );
}
