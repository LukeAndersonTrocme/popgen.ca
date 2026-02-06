# PopGen.ca Site Audit Improvements — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Address the full site audit — fill content gaps, consolidate data, merge redundant sections, add missing components (footer, publications highlight, improved join pitch), optimize images, and add SEO fundamentals.

**Architecture:** This is a series of incremental improvements to an existing Astro 5 + React + Tailwind static site. All changes are additive or refactoring — no new frameworks or dependencies except `@astrojs/sitemap`. The homepage remains a single-scroll layout with sections, but each section gets stronger content and the nav is updated to point to dedicated subpages. Data sources are consolidated so team/news changes happen in one place.

**Tech Stack:** Astro 5.7, React 19, Tailwind CSS 3.3, Framer Motion, Astro Image component (built-in)

---

## Prerequisites (manual — Luke must do these)

Before starting implementation, the following content needs to be provided by Luke:

- [ ] Real DOIs and URLs for all 13 publications in `src/data/publications.json` (currently all PLACEHOLDER)
- [ ] 2-3 sentence bio for Luke's team card (used in `index.json` team array)
- [ ] Decide which 3-4 publications to feature on the homepage as "Selected Publications"
- [ ] Replacement text for the hero.md TODO (or confirm using the index.json hero description instead)

---

## Task 1: Consolidate team data into a single source

**Why:** Team members are currently defined in 3 places — `en/index.json`, `people.astro` (hardcoded), and `fr/equipe.astro` (hardcoded). Adding a member means editing 4+ files. We consolidate to a single JSON source per locale.

**Files:**
- Modify: `src/content/en/index.json` — add `bio` field to team entries
- Modify: `src/content/fr/index.json` — add `bio` field to team entries
- Modify: `src/pages/people.astro` — read from index.json instead of hardcoding
- Modify: `src/pages/fr/equipe.astro` — read from index.json instead of hardcoding

**Step 1: Add bio fields to English team data**

In `src/content/en/index.json`, update the team array:

```json
"team": [
  {
    "name": "Luke Anderson-Trocmé",
    "role": "Principal Investigator",
    "img": "/assets/team/luke.jpg",
    "slug": "luke",
    "bio": "Population geneticist studying how ancestry spreads across space and time. PhD from McGill, NSERC Postdoctoral Fellow."
  },
  {
    "name": "Brian",
    "role": "Lab Mascot / Wellness Officer",
    "img": "/assets/team/brian.jpg",
    "slug": "brian",
    "bio": "Chief morale officer and nap specialist."
  },
  {
    "name": "This could be you!",
    "role": "Open positions coming soon",
    "img": "/assets/team/you.jpg",
    "bio": "We're recruiting MSc, PhD, and postdoc candidates."
  }
]
```

**Step 2: Add bio fields to French team data**

In `src/content/fr/index.json`, update the team array with French equivalents:

```json
"team": [
  {
    "name": "Luke Anderson-Trocmé",
    "role": "Investigateur principal",
    "img": "/assets/team/luke.jpg",
    "slug": "luke",
    "bio": "Généticien des populations étudiant comment l'ascendance se propage dans l'espace et le temps. PhD de McGill, boursier postdoctoral CRSNG."
  },
  {
    "name": "Brian",
    "role": "Mascotte du labo / Responsable du bien-être",
    "img": "/assets/team/brian.jpg",
    "slug": "brian",
    "bio": "Responsable du moral et spécialiste de la sieste."
  },
  {
    "name": "Ce pourrait être vous !",
    "role": "Postes ouverts bientôt",
    "img": "/assets/team/you.jpg",
    "bio": "Nous recrutons des candidats MSc, PhD et postdoc."
  }
]
```

**Step 3: Rewrite people.astro to use JSON data**

Replace the entire contents of `src/pages/people.astro`:

```astro
---
import Page from '../layouts/Page.astro';
import { Card, CardContent } from '../components/ui/card.jsx';
import data from '../content/en/index.json';
const { team } = data;
---
<Page title="People – PopGen Lab" lang="en" locale="en">
  <section class="py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((m) => {
        const href = m.slug ? `/${m.slug}` : null;
        const card = (
          <Card class="transform hover:scale-105 transition">
            <CardContent>
              <div class="w-32 h-32 mx-auto -mt-16 overflow-hidden rounded-full shadow-lg">
                <img src={m.img} alt={m.name} class="object-cover w-full h-full" />
              </div>
              <h3 class="mt-6 text-xl font-semibold text-center">{m.name}</h3>
              <p class="text-center text-sm text-slate-600 dark:text-slate-400">{m.role}</p>
              {m.bio && (
                <p class="mt-2 text-center text-slate-700 dark:text-slate-300">{m.bio}</p>
              )}
            </CardContent>
          </Card>
        );
        return href ? <a href={href} class="block">{card}</a> : <div>{card}</div>;
      })}
    </div>
  </section>
</Page>
```

**Step 4: Rewrite equipe.astro to use JSON data**

Replace the entire contents of `src/pages/fr/equipe.astro`:

```astro
---
import Page from '../../layouts/Page.astro';
import { Card, CardContent } from '../../components/ui/card.jsx';
import data from '../../content/fr/index.json';
const { team } = data;
---
<Page title="Équipe – Laboratoire PopGen" lang="fr" locale="fr">
  <section class="py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((m) => {
        const href = m.slug ? `/fr/${m.slug}` : null;
        const card = (
          <Card class="transform hover:scale-105 transition">
            <CardContent>
              <div class="w-32 h-32 mx-auto -mt-16 overflow-hidden rounded-full shadow-lg">
                <img src={m.img} alt={m.name} class="object-cover w-full h-full" />
              </div>
              <h3 class="mt-6 text-xl font-semibold text-center">{m.name}</h3>
              <p class="text-center text-sm text-slate-600 dark:text-slate-400">{m.role}</p>
              {m.bio && (
                <p class="mt-2 text-center text-slate-700 dark:text-slate-300">{m.bio}</p>
              )}
            </CardContent>
          </Card>
        );
        return href ? <a href={href} class="block">{card}</a> : <div>{card}</div>;
      })}
    </div>
  </section>
</Page>
```

**Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 6: Visual verification**

Run: `npm run preview`
Check: Homepage team section shows bios. `/people` and `/fr/equipe` render from JSON data, matching homepage cards.

**Step 7: Commit**

```bash
git add src/content/en/index.json src/content/fr/index.json src/pages/people.astro src/pages/fr/equipe.astro
git commit -m "refactor: consolidate team data into single JSON source per locale"
```

---

## Task 2: Fix content holes

**Why:** The hero has a TODO and lorem ipsum. Luke's team card has an empty bio. The hero.md file is unused (Hero.jsx uses hardcoded text). Clean all this up.

**Files:**
- Delete: `src/content/en/hero.md` (unused — Hero.jsx reads from hardcoded strings)
- Delete: `src/content/fr/hero.md` (unused)
- Modify: `src/components/Hero.jsx` — read from index.json instead of hardcoding

**Step 1: Update Hero.jsx to read from data props**

Hero.jsx currently hardcodes its bilingual text. Update it to accept a `data` prop from HeroSection.astro:

```jsx
// src/components/Hero.jsx
'use client';
import { motion } from 'framer-motion';

export default function Hero({ text }) {
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
```

**Step 2: Update HeroSection.astro to pass data**

```astro
---
// src/components/sections/HeroSection.astro
import Hero from '../Hero.jsx';
import enData from '../../content/en/index.json';
import frData from '../../content/fr/index.json';
const { locale = 'en' } = Astro.props;
const data = locale === 'fr' ? frData : enData;
---
<Hero text={data.hero} client:load />
```

**Step 3: Delete unused hero.md files**

```bash
rm src/content/en/hero.md src/content/fr/hero.md
```

**Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Hero reads from index.json data.

**Step 5: Commit**

```bash
git add src/components/Hero.jsx src/components/sections/HeroSection.astro
git rm src/content/en/hero.md src/content/fr/hero.md
git commit -m "fix: remove hero.md TODOs, drive hero from index.json data"
```

---

## Task 3: Merge ResearchSection and WhySection

**Why:** Both sections display the same `research.intro` and `research.points` data. The WhySection parallax presentation is more visually compelling — keep that style but consolidate into one section with the `id="research"` anchor.

**Files:**
- Modify: `src/components/sections/WhySection.astro` — rename to ResearchSection, take over `id="research"`
- Delete: `src/components/sections/ResearchSection.astro` (old version)
- Modify: `src/pages/index.astro` — remove old ResearchSection import, keep WhySection (now the sole research section)
- Modify: `src/pages/fr/index.astro` — same

**Step 1: Update WhySection.astro to be the primary research section**

Replace contents of `src/components/sections/WhySection.astro`:

```astro
---
// src/components/sections/WhySection.astro
// This is now the sole research section on the homepage.
import Reveal from '../Reveal.jsx';
import enData from '../../content/en/index.json';
import frData from '../../content/fr/index.json';

const { locale = 'en' } = Astro.props;
const data = locale === 'fr' ? frData : enData;
---
<section id="research" class="relative scroll-mt-24">
  <!-- Parallax background -->
  <div
    class="absolute inset-0 bg-fixed bg-center bg-cover"
    style="background-image: url('/assets/why-bg.jpg');"
  ></div>

  <!-- Foreground content -->
  <div class="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
    <!-- Title + Intro -->
    <Reveal client:load>
      <div class="py-20">
        <h2 class="text-5xl font-bold">
          {locale === 'en' ? 'Our Research' : 'Notre recherche'}
        </h2>
        <p class="mt-4 text-lg">{data.research.intro}</p>
      </div>
    </Reveal>

    <!-- Each research point -->
    {data.research.points.map((point) => (
      <Reveal client:load>
        <div class="py-20">
          <h3 class="text-3xl font-semibold">{point.title}</h3>
          <p class="mt-2">{point.desc}</p>
        </div>
      </Reveal>
    ))}
  </div>
</section>
```

**Step 2: Update index.astro — remove old ResearchSection**

```astro
---
import Page from '../layouts/Page.astro';
import HeroSection from '../components/sections/HeroSection.astro';
import WhySection from '../components/sections/WhySection.astro';
import TeamSection from '../components/sections/TeamSection.astro';
import NewsSection from '../components/sections/NewsSection.astro';
import JoinSection from '../components/sections/JoinSection.astro';
import ContactSection from '../components/sections/ContactSection.astro';

const { locale = 'en' } = Astro.props;
---
<Page title="PopGen Lab" lang="en" locale={locale}>
  <HeroSection locale={locale} />
  <WhySection locale={locale} />
  <TeamSection locale={locale} />
  <NewsSection locale={locale} />
  <JoinSection locale={locale} />
  <ContactSection locale={locale} />
</Page>
```

**Step 3: Update fr/index.astro — same change**

Remove the ResearchSection import and usage, keeping the same pattern as the English index.

**Step 4: Delete old ResearchSection.astro**

```bash
rm src/components/sections/ResearchSection.astro
```

**Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Homepage has one research section (parallax style) with `id="research"`.

**Step 6: Commit**

```bash
git add src/components/sections/WhySection.astro src/pages/index.astro src/pages/fr/index.astro
git rm src/components/sections/ResearchSection.astro
git commit -m "refactor: merge duplicate research sections into single parallax section"
```

---

## Task 4: Add publications highlight to homepage

**Why:** 13 publications including a Science paper — this is the lab's strongest credibility signal and it's completely absent from the homepage.

**Files:**
- Create: `src/components/sections/PublicationsSection.astro`
- Modify: `src/pages/index.astro` — add PublicationsSection
- Modify: `src/pages/fr/index.astro` — add PublicationsSection

**Step 1: Create PublicationsSection.astro**

Create `src/components/sections/PublicationsSection.astro`:

```astro
---
import Reveal from '../Reveal.jsx';
import publications from '../../data/publications.json';

const { locale = 'en' } = Astro.props;

// Show top 4 publications (most recent / highest impact)
const featured = publications.slice(0, 4);
---
<Reveal client:load>
  <section
    id="publications"
    class="scroll-mt-24 py-20 bg-[#F7F9FC] dark:bg-slate-800 text-center"
  >
    <h2 class="text-4xl font-bold">
      {locale === 'fr' ? 'Publications sélectionnées' : 'Selected Publications'}
    </h2>
    <ul class="mt-8 max-w-2xl mx-auto space-y-4 text-left">
      {featured.map((p) => (
        <li class="border-l-4 border-primary pl-4">
          <a
            href={p.doi ? `https://doi.org/${p.doi}` : p.url}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            <strong>{p.title}</strong>
          </a>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <em>{p.journal}</em>, {p.year}
          </p>
        </li>
      ))}
    </ul>
    <a
      href={locale === 'fr' ? '/fr/publications' : '/publications'}
      class="mt-8 inline-block text-primary hover:underline font-semibold"
    >
      {locale === 'fr' ? 'Voir toutes les publications →' : 'View all publications →'}
    </a>
  </section>
</Reveal>
```

**Step 2: Add to index.astro**

Insert after TeamSection and before NewsSection:

```astro
import PublicationsSection from '../components/sections/PublicationsSection.astro';
```

And in the template:
```astro
<TeamSection locale={locale} />
<PublicationsSection locale={locale} />
<NewsSection locale={locale} />
```

**Step 3: Add to fr/index.astro**

Same pattern — import PublicationsSection and place between TeamSection and NewsSection.

**Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Homepage shows 4 featured publications between Team and News.

**Step 5: Commit**

```bash
git add src/components/sections/PublicationsSection.astro src/pages/index.astro src/pages/fr/index.astro
git commit -m "feat: add selected publications section to homepage"
```

---

## Task 5: Improve JoinSection on homepage

**Why:** Currently the join section is just a list of UdeM program links. The actual pitch ("no bio degree required, we teach the biology, methods-oriented research") is buried in join.md. Surface the good stuff.

**Files:**
- Modify: `src/content/en/index.json` — add `join` object with pitch text
- Modify: `src/content/fr/index.json` — add `join` object with French pitch text
- Modify: `src/components/sections/JoinSection.astro` — display pitch + links

**Step 1: Add join pitch to English data**

Add to `src/content/en/index.json` (new top-level key):

```json
"join": {
  "pitch": "We're building a computational and statistical population genetics group. You don't need a biology degree — we teach the biology. What matters is curiosity, comfort with programming, and enthusiasm for patterns in complex data.",
  "cta": "Interested in MSc, PhD, or postdoc positions? Reach out to discuss timing and fit."
}
```

**Step 2: Add join pitch to French data**

Add to `src/content/fr/index.json`:

```json
"join": {
  "pitch": "Nous bâtissons un groupe de recherche en génétique des populations computationnelle et statistique. Pas besoin d'un diplôme en biologie — nous enseignons la biologie. Ce qui compte : la curiosité, l'aisance en programmation et l'enthousiasme pour les données complexes.",
  "cta": "Intéressé·e par un poste MSc, PhD ou postdoc ? Contactez-nous pour discuter."
}
```

**Step 3: Update JoinSection.astro**

Replace contents of `src/components/sections/JoinSection.astro`:

```astro
---
import Reveal from '../Reveal.jsx';
import enData from '../../content/en/index.json';
import frData from '../../content/fr/index.json';
const { locale = 'en' } = Astro.props;
const data = locale === 'fr' ? frData : enData;
const { join, links } = data;
---
<Reveal client:load>
  <section
    id="join"
    class="scroll-mt-24 py-20 bg-white dark:bg-slate-900 text-center"
  >
    <h2 class="text-4xl font-bold">
      {locale === 'fr' ? 'Rejoindre le labo' : 'Join the Lab'}
    </h2>
    <p class="mt-6 max-w-2xl mx-auto text-lg">
      {join.pitch}
    </p>
    <p class="mt-4 max-w-2xl mx-auto font-semibold text-primary">
      {join.cta}
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      {links.map((l) => (
        <a
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
        >
          {l.label}
        </a>
      ))}
    </div>
    <a
      href={locale === 'fr' ? '/fr/rejoindre' : '/join'}
      class="mt-6 inline-block text-primary hover:underline font-semibold"
    >
      {locale === 'fr' ? 'En savoir plus →' : 'Learn more →'}
    </a>
  </section>
</Reveal>
```

**Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Join section now shows pitch text, CTA, styled program links, and "Learn more" link to full subpage.

**Step 5: Commit**

```bash
git add src/content/en/index.json src/content/fr/index.json src/components/sections/JoinSection.astro
git commit -m "feat: improve join section with recruitment pitch and styled links"
```

---

## Task 6: Add site footer

**Why:** The page currently just ends after the contact section. A footer provides institutional affiliation, quick navigation, and professional polish.

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/Page.astro` — include Footer

**Step 1: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
const { locale = 'en' } = Astro.props;

const navItems = locale === 'fr'
  ? [
      { label: 'Recherche', href: '/fr/recherche' },
      { label: 'Équipe', href: '/fr/equipe' },
      { label: 'Publications', href: '/fr/publications' },
      { label: 'Nouvelles', href: '/fr/nouvelles' },
      { label: 'Rejoindre', href: '/fr/rejoindre' },
      { label: 'Contact', href: '/fr/contact' },
    ]
  : [
      { label: 'Research', href: '/research' },
      { label: 'People', href: '/people' },
      { label: 'Publications', href: '/publications' },
      { label: 'News', href: '/news' },
      { label: 'Join', href: '/join' },
      { label: 'Contact', href: '/contact' },
    ];
---
<footer class="bg-slate-900 text-slate-300 py-12 mt-12">
  <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Lab info -->
    <div>
      <h3 class="text-white font-bold text-lg">PopGen Lab</h3>
      <p class="mt-2 text-sm">
        Anderson-Trocmé Lab<br />
        Département de biologie<br />
        Université de Montréal<br />
        Campus MIL, bureau B-5411
      </p>
    </div>

    <!-- Quick links -->
    <div>
      <h3 class="text-white font-bold text-lg">
        {locale === 'fr' ? 'Liens rapides' : 'Quick Links'}
      </h3>
      <ul class="mt-2 space-y-1">
        {navItems.map((item) => (
          <li>
            <a href={item.href} class="text-sm hover:text-white transition">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <!-- External links -->
    <div>
      <h3 class="text-white font-bold text-lg">
        {locale === 'fr' ? 'Liens externes' : 'External'}
      </h3>
      <ul class="mt-2 space-y-1">
        <li>
          <a href="https://scholar.google.ca/citations?hl=en&pli=1&user=5ZUZPIAAAAAJ"
             target="_blank" rel="noopener noreferrer" class="text-sm hover:text-white transition">
            Google Scholar
          </a>
        </li>
        <li>
          <a href="https://github.com/LukeAndersonTrocme"
             target="_blank" rel="noopener noreferrer" class="text-sm hover:text-white transition">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://orcid.org/0000-0001-9187-2792"
             target="_blank" rel="noopener noreferrer" class="text-sm hover:text-white transition">
            ORCID
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
    &copy; {new Date().getFullYear()} Anderson-Trocmé Lab, Université de Montréal
  </div>
</footer>
```

**Step 2: Add Footer to Page.astro layout**

Modify `src/layouts/Page.astro` — import Footer and place after `</main>`, before `</body>`:

```astro
---
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.astro';
const { title, lang = 'en', locale = 'en' } = Astro.props;
---
<!DOCTYPE html>
<html lang={lang} class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content="PopGen Lab at Université de Montréal—computational genomics beyond boundaries." />
    <meta property="og:image" content="/og.jpg" />
    <link rel="stylesheet" href="/styles/fonts.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="font-sans bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50">
    <Navbar client:load locale={locale} />
    <main class="max-w-7xl mx-auto px-4 my-12 prose lg:prose-xl">
      <slot />
    </main>
    <Footer locale={locale} />
  </body>
</html>
```

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Every page now has a footer with lab info, quick links, and external links.

**Step 4: Commit**

```bash
git add src/components/Footer.astro src/layouts/Page.astro
git commit -m "feat: add site-wide footer with nav, institutional info, and external links"
```

---

## Task 7: Switch to Astro Image component

**Why:** Images are served as raw unoptimized files. The Brian gallery alone is 23 MB. Astro's built-in `<Image>` component provides automatic WebP/AVIF conversion, responsive srcsets, and lazy loading.

**Files:**
- Modify: `src/components/sections/TeamSection.astro` — use Astro Image
- Modify: `src/components/Hero.jsx` — this one stays as raw img (it's a CSS background-image, can't use Astro Image)
- Modify: `src/pages/luke.astro` — use Astro Image for profile photo
- Modify: `src/pages/fr/luke.astro` — same
- Modify: `src/pages/brian.astro` — pass optimized src to Gallery
- Modify: `src/pages/fr/brian.astro` — same
- Modify: `src/components/Footer.astro` — no images, skip
- Modify: `src/components/Navbar.jsx` — logo img (React component, use standard img with width/height)

**Step 1: Add width/height to Navbar logo**

In `src/components/Navbar.jsx`, update the logo img tag to include dimensions for layout stability:

```jsx
<img src="/assets/logo.jpg" alt="PopGen Lab logo" className="h-10 w-auto" width={120} height={40} loading="eager" />
```

**Step 2: Update TeamSection.astro to use Astro Image**

At the top of `src/components/sections/TeamSection.astro`, add the import and update the img tag:

```astro
---
import { Image } from 'astro:assets';
import Reveal from '../Reveal.jsx';
import { Card, CardContent } from '../ui/card.jsx';
import enData from '../../content/en/index.json';
import frData from '../../content/fr/index.json';
const { locale = 'en' } = Astro.props;
const data = locale === 'fr' ? frData : enData;
const { team } = data;
---
```

Note: Astro's `<Image>` requires static imports for local files or full URLs. Since team images are in `/public/`, they're served as-is and can't use `<Image>` directly. Instead, add `width`, `height`, and `loading="lazy"` attributes to the existing `<img>` tags:

```html
<img src={m.img} alt={m.name} class="object-cover w-full h-full" width={128} height={128} loading="lazy" />
```

**Step 3: Update luke.astro profile images**

In both `src/pages/luke.astro` and `src/pages/fr/luke.astro`, add dimensions and lazy loading:

```html
<img src="/assets/team/luke.jpg" alt="Luke Anderson-Trocmé" class="w-48 h-48 rounded-full object-cover shadow-lg" width={192} height={192} loading="lazy" />
```

**Step 4: Optimize Brian gallery images manually**

The Brian gallery images (3.8–5.3 MB each) need to be resized. Run imagemagick or similar:

```bash
# If imagemagick is installed:
cd public/assets/team/brian
for f in *.jpg; do
  convert "$f" -resize 1200x1200\> -quality 80 "$f"
done
```

If imagemagick is not available, note this as a manual TODO. Target: each image under 300 KB.

**Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Images have proper dimensions. Gallery images are smaller.

**Step 6: Commit**

```bash
git add src/components/sections/TeamSection.astro src/components/Navbar.jsx src/pages/luke.astro src/pages/fr/luke.astro
git commit -m "perf: add image dimensions, lazy loading, and optimize gallery images"
```

---

## Task 8: Add per-page SEO metadata and sitemap

**Why:** Every page currently shares the same OG description. No sitemap exists. These are quick wins for discoverability.

**Files:**
- Modify: `src/layouts/Page.astro` — accept `description` prop, add meta description tag
- Modify: all page files — pass description prop to Page layout
- Modify: `astro.config.mjs` — add @astrojs/sitemap
- Create: `public/robots.txt`

**Step 1: Install sitemap integration**

```bash
npm install @astrojs/sitemap
```

**Step 2: Update astro.config.mjs**

Add sitemap to integrations:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://popgen.ca',
  output: 'static',
  integrations: [tailwind(), react(), sitemap()],
  // ... rest of config
});
```

**Step 3: Update Page.astro to accept description**

```astro
---
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.astro';
const {
  title,
  lang = 'en',
  locale = 'en',
  description = 'PopGen Lab at Université de Montréal — computational genomics beyond boundaries.'
} = Astro.props;
---
<!DOCTYPE html>
<html lang={lang} class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/og.jpg" />
    <link rel="stylesheet" href="/styles/fonts.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="font-sans bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50">
    <Navbar client:load locale={locale} />
    <main class="max-w-7xl mx-auto px-4 my-12 prose lg:prose-xl">
      <slot />
    </main>
    <Footer locale={locale} />
  </body>
</html>
```

**Step 4: Add descriptions to key pages**

Update each page's `<Page>` component to include a `description` prop. Examples:

- `index.astro`: `description="PopGen Lab — computational population genetics at Université de Montréal. We study how ancestry spreads across space and time."`
- `research.astro`: `description="Research at PopGen Lab — spatial genetics, ancestral recombination graphs, genealogical modeling, and conservation genomics."`
- `publications.astro`: `description="Publications from the Anderson-Trocmé Lab at Université de Montréal."`
- `people.astro`: `description="Meet the PopGen Lab team at Université de Montréal."`
- `join.astro`: `description="Join the PopGen Lab — MSc, PhD, and postdoc positions in computational population genetics at Université de Montréal."`

Apply equivalent French descriptions to `/fr/` pages.

**Step 5: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://popgen.ca/sitemap-index.xml
```

**Step 6: Build and verify**

Run: `npm run build`
Expected: Build succeeds. `dist/sitemap-index.xml` is generated. Pages have unique meta descriptions.

**Step 7: Commit**

```bash
git add astro.config.mjs src/layouts/Page.astro public/robots.txt src/pages/
git commit -m "feat: add per-page SEO descriptions, sitemap, and robots.txt"
```

---

## Task 9: Update nav to link to subpages

**Why:** Nav links currently point to homepage anchors (`/#research`). From a subpage, clicking "Research" sends you back to the homepage instead of to `/research`. Update nav to point to dedicated subpages.

**Files:**
- Modify: `src/components/Navbar.jsx` — update routes

**Step 1: Update Navbar routes**

In `src/components/Navbar.jsx`, update the routes object:

```javascript
const routes = {
  en: {
    home: '/',
    research: '/research',
    people: '/people',
    publications: '/publications',
    news: '/news',
    join: '/join',
    contact: '/contact',
    switch: '/fr',
    switchLabel: 'Français',
    homeLabel: 'Home',
    researchLabel: 'Research',
    peopleLabel: 'Team',
    publicationsLabel: 'Publications',
    newsLabel: 'News',
    joinLabel: 'Join Us',
    contactLabel: 'Contact',
  },
  fr: {
    home: '/fr/',
    research: '/fr/recherche',
    people: '/fr/equipe',
    publications: '/fr/publications',
    news: '/fr/nouvelles',
    join: '/fr/rejoindre',
    contact: '/fr/contact',
    switch: '/',
    switchLabel: 'English',
    homeLabel: 'Accueil',
    researchLabel: 'Recherche',
    peopleLabel: 'Équipe',
    publicationsLabel: 'Publications',
    newsLabel: 'Nouvelles',
    joinLabel: 'Rejoindre',
    contactLabel: 'Contact',
  },
};
```

**Step 2: Update menuItems array**

```javascript
const menuItems = ['home', 'research', 'people', 'publications', 'news', 'join', 'contact'];
```

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Nav links point to subpages. Publications appears in nav.

**Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: update nav to link to dedicated subpages, add publications link"
```

---

## Task 10: Improve the /research subpage

**Why:** The research subpage currently renders bare markdown. It should stand on its own with more depth than the homepage section.

**Files:**
- Modify: `src/pages/research.astro` — rich layout with data from index.json
- Modify: `src/pages/fr/recherche.astro` — same for French

**Step 1: Rewrite research.astro**

Replace `src/pages/research.astro`:

```astro
---
import Page from '../layouts/Page.astro';
import Reveal from '../components/Reveal.jsx';
import data from '../content/en/index.json';
const { research } = data;
---
<Page
  title="Research – PopGen Lab"
  lang="en"
  locale="en"
  description="Research at PopGen Lab — spatial genetics, ancestral recombination graphs, genealogical modeling, and conservation genomics."
>
  <Reveal client:load>
    <section class="py-12 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold">Our Research</h1>
      <p class="mt-6 text-lg">{research.intro}</p>

      <div class="mt-12 space-y-12">
        {research.points.map((point) => (
          <div class="border-l-4 border-primary pl-6">
            <h2 class="text-2xl font-semibold">{point.title}</h2>
            <p class="mt-2 text-slate-700 dark:text-slate-300">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Reveal>
</Page>
```

**Step 2: Rewrite fr/recherche.astro**

Same pattern, using French data and French strings.

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. `/research` is a proper page with structured content.

**Step 4: Commit**

```bash
git add src/pages/research.astro src/pages/fr/recherche.astro
git commit -m "feat: build out research subpage with structured layout"
```

---

## Task 11: Improve the /publications subpage

**Why:** The publications page is a bare list. Add year grouping and better visual hierarchy.

**Files:**
- Modify: `src/pages/publications.astro`
- Modify: `src/pages/fr/publications.astro`

**Step 1: Rewrite publications.astro**

Replace `src/pages/publications.astro`:

```astro
---
import Page from '../layouts/Page.astro';
import publications from '../data/publications.json';

// Group by year, descending
const byYear = publications.reduce((acc, p) => {
  (acc[p.year] = acc[p.year] || []).push(p);
  return acc;
}, {});
const years = Object.keys(byYear).sort((a, b) => b - a);
---
<Page
  title="Publications – PopGen Lab"
  lang="en"
  locale="en"
  description="Publications from the Anderson-Trocmé Lab at Université de Montréal."
>
  <section class="py-12 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold">Publications</h1>
    {years.map((year) => (
      <div class="mt-10">
        <h2 class="text-2xl font-semibold text-primary">{year}</h2>
        <ul class="mt-4 space-y-4">
          {byYear[year].map((p) => (
            <li class="border-l-4 border-slate-200 dark:border-slate-700 pl-4">
              <a
                href={p.doi ? `https://doi.org/${p.doi}` : p.url}
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline font-medium"
              >
                {p.title}
              </a>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                <em>{p.journal}</em>
              </p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
</Page>
```

**Step 2: Rewrite fr/publications.astro**

Same pattern with French title and locale props.

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. `/publications` shows papers grouped by year with left border accents.

**Step 4: Commit**

```bash
git add src/pages/publications.astro src/pages/fr/publications.astro
git commit -m "feat: improve publications page with year grouping and better layout"
```

---

## Task 12: Switch Navbar hydration from client:load to client:idle

**Why:** The Navbar hydrates React immediately on page load. Since users don't interact with it in the first milliseconds, `client:idle` defers hydration until the browser is idle — small free performance win.

**Files:**
- Modify: `src/layouts/Page.astro` — change `client:load` to `client:idle`

**Step 1: Update Page.astro**

Change:
```astro
<Navbar client:load locale={locale} />
```
To:
```astro
<Navbar client:idle locale={locale} />
```

**Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Nav still works (hydrates after page is idle).

**Step 3: Commit**

```bash
git add src/layouts/Page.astro
git commit -m "perf: defer navbar hydration to client:idle"
```

---

## Summary of changes

| Task | Type | Impact |
|------|------|--------|
| 1. Consolidate team data | Refactor | Eliminates 4-file duplication |
| 2. Fix content holes | Content | Removes TODOs and empty bios |
| 3. Merge research sections | Refactor | One clear research narrative |
| 4. Publications on homepage | Feature | Strongest credibility signal added |
| 5. Improve join section | Content | Actually sells the lab to recruits |
| 6. Add footer | Feature | Professional polish, institutional info |
| 7. Image optimization | Performance | ~90% reduction in image payload |
| 8. SEO + sitemap | SEO | Per-page descriptions, auto sitemap |
| 9. Nav → subpages | UX | Proper navigation between pages |
| 10. Research subpage | Content | Standalone page with depth |
| 11. Publications subpage | UX | Year-grouped, better visual hierarchy |
| 12. Navbar hydration | Performance | Free perf win, one-line change |

**Total: 12 tasks, ~12 commits, estimated 45–60 minutes of implementation time.**
