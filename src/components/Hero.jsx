// --- src/components/Hero.jsx ---
'use client';
import { motion } from 'framer-motion';

export default function Hero({ locale = 'en' }) {
  const text = locale === 'en'
    ? {
        title: 'PopGen Lab',
        subtitle: 'Launching Fall 2025',
        description: 'Placeholder research teaser—replace with yours.',
      }
    : {
        title: 'Laboratoire PopGen',
        subtitle: 'Lancement automne 2025',
        description: 'Texte de présentation factice à remplacer.',
      };

  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center bg-primary text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-6xl font-bold">{text.title}</h1>
      <p className="mt-4 text-2xl">{text.subtitle}</p>
      <p className="mt-6 max-w-lg text-center">{text.description}</p>
    </motion.section>
  );
}
