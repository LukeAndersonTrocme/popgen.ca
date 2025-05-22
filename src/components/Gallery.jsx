// src/components/Gallery.jsx
'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'; 
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export default function Gallery({ slides }) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className="rounded-lg shadow-lg object-cover w-full h-48 cursor-pointer"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails]}
      />
    </>
  );
}
