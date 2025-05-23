'use client';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function WhySection({ locale = 'en' }) {
  return (
    <LocomotiveScrollProvider
      options={{ smooth: true, lerp: 0.1 }}
      watch={[]}
    >
      <div data-scroll-container>
        <section data-scroll-section className="py-20">
          <h2 className="text-4xl font-bold">
            {locale === 'en' ? 'From geography to genomes' : 'De la géographie aux génomes'}
          </h2>
          {/* Insert static map wavefront GIF here */}
        </section>
        <section data-scroll-section className="py-20">
          <div className="sticky top-20">
            {/* PCA scatter plot island here */}
          </div>
        </section>
        {/* Add more scenes as needed */}
      </div>
    </LocomotiveScrollProvider>
  );
}