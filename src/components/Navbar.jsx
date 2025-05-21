// --- src/components/Navbar.jsx ---
import { useState } from 'react';

/**
 * Centralised route map so EN/FR slugs stay in sync.
 * Add new pages here once they exist (e.g. join / rejoindre).
 */
const routes = {
  en: {
    home: '/',
    research: '/research',
    publications: '/publications',
    switch: '/fr',        // link to French home
    switchLabel: 'Français',
    homeLabel: 'Home',
    researchLabel: 'Research',
    pubsLabel: 'Publications',
  },
  fr: {
    home: '/fr',
    research: '/fr/recherche',
    publications: '/fr/publications',
    switch: '/',
    switchLabel: 'English',
    homeLabel: 'Accueil',
    researchLabel: 'Recherche',
    pubsLabel: 'Publications', // same string in FR
  },
};

export default function Navbar({ locale = 'en' }) {
  const r = routes[locale] ?? routes.en;

  return (
    <nav className="p-4 flex justify-between bg-white dark:bg-slate-900">
      <ul className="flex space-x-6">
        <li>
          <a href={r.home} className="hover:text-cta">
            {r.homeLabel}
          </a>
        </li>
        <li>
          <a href={r.research} className="hover:text-cta">
            {r.researchLabel}
          </a>
        </li>
        <li>
          <a href={r.publications} className="hover:text-cta">
            {r.pubsLabel}
          </a>
        </li>
      </ul>

      {/* Language switcher */}
      <a
        href={r.switch}
        className="font-semibold hover:text-highlight"
      >
        {r.switchLabel}
      </a>
    </nav>
  );
}
