// src/components/Hero.jsx
'use client';
import { motion } from 'framer-motion';

export default function Hero({ locale = 'en' }) {
  const text = locale === 'en'
    ? {
        title: 'Genomics Beyond Boundaries',
        subtitle: 'Opening Our Doors Fall 2025',
        description:
          'Our lab uses powerful computational methods to map how genetic information spreads across landscapes and generations.',
      }
    : {
        title: 'La génomique sans frontières',
        subtitle: "Ouverture officielle à l'automne 2025",
        description:
          'Notre labo utilise des méthodes computationnelles pour cartographier comment l’information génétique se propage.',
      };

  return (
    <motion.section
      id="home"
      className="relative h-screen w-full bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/hero.jpg')" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="text-7xl lg:text-8xl font-bold">{text.title}</h1>
        <p className="mt-4 text-2xl">{text.subtitle}</p>
        <p className="mt-6 max-w-lg">{text.description}</p>
      </div>
    </motion.section>
  );
}
