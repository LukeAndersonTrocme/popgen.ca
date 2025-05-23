---
collection: "pages"
slug: "brian"
locale: "fr"
title: "Brian"
layout: "generic"
---

import Reveal from '../../components/Reveal.jsx';
import Gallery from '../../components/Gallery.jsx';
import { readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

// Load all images in public/assets/team/brian
const folderOnDisk = join(cwd(), 'public', 'assets', 'team', 'brian');
const files = readdirSync(folderOnDisk).filter((f) => /\.(jpe?g|png|heic)$/i.test(f));
const photos = files.map((f) => ({ src: `/assets/team/brian/${f}`, alt: `Brian le chat: ${f}` }));

<Reveal client:load>
  <section class="py-20 text-center">
    <h1 class="text-5xl font-bold">Brian</h1>
    <p class="mt-4 mx-auto max-w-2xl">
      Notre mascotte officielle et responsable du bien-être 🐱. Profitez de ces photos !
    </p>
    <Gallery slides={photos} client:load />
  </section>
</Reveal>