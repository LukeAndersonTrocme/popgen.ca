// src/components/Gallery.jsx
'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/** 
 * slides: [{ src: string, alt?: string }, …]
 */
export default function Gallery({ slides }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      {/* Grid of thumbnails */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt || `Photo ${i + 1}`}
            className="rounded-lg shadow-lg object-cover w-full h-48 cursor-pointer"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* Fullscreen lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides.map(({ src, alt }) => ({ src, title: alt }))}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
