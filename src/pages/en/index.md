---
collection: "pages"
slug: ""
locale: "en"
title: "PopGen Lab"
layout: "landing"
---
import HeroSection    from '../../components/sections/HeroSection.astro';
import ResearchSection from '../../components/sections/ResearchSection.astro';
import TeamSection     from '../../components/sections/TeamSection.astro';
import NewsSection     from '../../components/sections/NewsSection.astro';
import JoinSection     from '../../components/sections/JoinSection.astro';
import ContactSection  from '../../components/sections/ContactSection.astro';

<HeroSection    client:load locale="en" />
<ResearchSection client:load locale="en" />
<TeamSection     client:load locale="en" />
<NewsSection     client:load locale="en" />
<JoinSection     client:load locale="en" />
<ContactSection  client:load locale="en" />