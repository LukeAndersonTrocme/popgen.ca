// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet.jsx';
import ModeToggle from './ModeToggle.jsx';
import { Menu } from 'lucide-react';

const routes = {
  en: {
    home: '/',
    research: '/research',
    publications: '/publications',
    people: '/people',
    news: '/news',
    join: '/join',
    contact: '/contact',
    switch: '/fr',
    switchLabel: 'Français',
    homeLabel: 'Home',
    researchLabel: 'Research',
    pubsLabel: 'Publications',
    peopleLabel: 'Team',
    newsLabel: 'News',
    joinLabel: 'Join us',
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
    joinLabel: 'Nous joindre',
    contactLabel: 'Contact',
  },
};

export default function Navbar({ locale = 'en' }) {
  const r = routes[locale] || routes.en;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 p-4 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      {/* Desktop */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4">
        <ul className="flex space-x-6">
          <li><a href={r.home}        className="hover:text-cta">{r.homeLabel}</a></li>
          <li><a href={r.research}    className="hover:text-cta">{r.researchLabel}</a></li>
          <li><a href={r.publications}className="hover:text-cta">{r.pubsLabel}</a></li>
          <li><a href={r.people}      className="hover:text-cta">{r.peopleLabel}</a></li>
          <li><a href={r.news}        className="hover:text-cta">{r.newsLabel}</a></li>
          <li><a href={r.join}        className="hover:text-cta">{r.joinLabel}</a></li>
          <li><a href={r.contact}     className="hover:text-cta">{r.contactLabel}</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <a href={r.switch} className="font-semibold hover:text-highlight">
            {r.switchLabel}
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <a href={r.switch} className="font-semibold">{r.switchLabel}</a>
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu"><Menu /></button>
            </SheetTrigger>
            <SheetContent position="right" className="p-4">
              <ul className="space-y-4">
                {['home','research','publications','people','news','join','contact'].map((key) => (
                  <li key={key}>
                    <a href={r[key]} className="block text-lg">{r[`${key}Label`]}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center">
                <ModeToggle />
                <a href={r.switch} className="ml-4 font-semibold">
                  {r.switchLabel}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
);
}
