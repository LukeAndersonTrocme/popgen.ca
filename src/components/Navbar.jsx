'use client';
import { useState, useEffect } from 'react';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet.jsx';
import ModeToggle from './ModeToggle.jsx';
import { Menu } from 'lucide-react';

const routes = {
  en: {
    // Always go to root, not just #home
    home: '/',
    research: '/#research',
    people: '/#people',
    news: '/#news',
    join: '/#join',
    contact: '/#contact',
    switch: '/fr',
    switchLabel: 'Français',
    homeLabel: 'Home',
    researchLabel: 'Research',
    peopleLabel: 'Team',
    newsLabel: 'News',
    joinLabel: 'Join Us',
    contactLabel: 'Contact',
  },
  fr: {
    home: '/fr/',
    research: '/fr/#research',
    people: '/fr/#people',
    news: '/fr/#news',
    join: '/fr/#join',
    contact: '/fr/#contact',
    switch: '/',
    switchLabel: 'English',
    homeLabel: 'Accueil',
    researchLabel: 'Recherche',
    peopleLabel: 'Équipe',
    newsLabel: 'Nouvelles',
    joinLabel: 'Rejoindre',
    contactLabel: 'Contact',
  },
};

export default function Navbar({ locale = 'en' }) {
  const r = routes[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = ['home','research','people','news','join','contact'];

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 p-4 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo */}
        <a href={r.home}>
          <img src="/assets/logo.jpg" alt="PopGen Lab logo" className="h-10 w-auto" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((key) => (
            <li key={key}>
              <a href={r[key]} className="hover:text-cta">
                {r[`${key}Label`]}
              </a>
            </li>
          ))}
          <li className="flex items-center space-x-2">
            <ModeToggle />
            <a href={r.switch} className="font-semibold hover:text-highlight">
              {r.switchLabel}
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <div className="md:hidden flex items-center space-x-4">
          <ModeToggle />
          <a href={r.switch} className="font-semibold">{r.switchLabel}</a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent position="right" className="p-4">
              <ul className="space-y-4">
                {menuItems.map((key) => (
                  <li key={key}>
                    <a
                      href={r[key]}
                      onClick={() => setOpen(false)}
                      className="block text-lg"
                    >
                      {r[`${key}Label`]}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
