// --- src/components/Navbar.jsx ---
import { useState } from 'react';

/**
 * Centralised route map so EN/FR slugs stay in sync.
 * Add new pages here once they exist.
 */
const routes = {
  en: {
    home: '/',
    research: '/research',
    publications: '/publications',
    people: '/people',
    news: '/news',
    join: '/join',
    contact: '/contact',
    switch: '/fr',        // link to French home
    switchLabel: 'Français',
    homeLabel: 'Home',
    researchLabel: 'Research',
    pubsLabel: 'Publications',
    peopleLabel: 'People',
    newsLabel: 'News',
    joinLabel: 'How to Join',
    contactLabel: 'Contact',
  },
  fr: {
    home: '/fr',
    research: '/fr/recherche',
    publications: '/fr/publications',
    people: '/fr/equipe',
    news: '/fr/nouvelles',
    join: '/fr/rejoindre',
    contact: '/fr/contact',
    switch: '/',
    switchLabel: 'English',
    homeLabel: 'Accueil',
    researchLabel: 'Recherche',
    pubsLabel: 'Publications',
    peopleLabel: 'Équipe',
    newsLabel: 'Nouvelles',
    joinLabel: 'Rejoindre',
    contactLabel: 'Contact',
  },
};

export default function Navbar({ locale = 'en' }) {
  const r = routes[locale] ?? routes.en;

  return (
    <nav className="p-4 flex justify-between bg-white dark:bg-slate-900">
      <ul className="flex space-x-6 flex-wrap">
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
        <li>
          <a href={r.people} className="hover:text-cta">
            {r.peopleLabel}
          </a>
        </li>
        <li>
          <a href={r.news} className="hover:text-cta">
            {r.newsLabel}
          </a>
        </li>
        <li>
          <a href={r.join} className="hover:text-cta">
            {r.joinLabel}
          </a>
        </li>
        <li>
          <a href={r.contact} className="hover:text-cta">
            {r.contactLabel}
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
