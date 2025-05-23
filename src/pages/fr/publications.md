---
collection: "pages"
slug: "publications"
locale: "fr"
title: "Publications"
layout: "generic"
---

import publications from '../../data/publications.json';

<h1>Publications</h1>
<ul>
  {publications.map((p) => (
    <li>
      <a
        href={p.doi ? `https://doi.org/${p.doi}` : p.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {p.title} (<em>{p.journal}, {p.year}</em>)
      </a>
    </li>
  ))}
</ul>