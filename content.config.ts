// content.config.ts
import { defineCollection, glob, z } from 'astro:content';

export const collections = {
  pages: defineCollection({
    schema: z.object({
      locale: z.enum(['en','fr']),
      slug:   z.string(),
      title:  z.string(),
      layout: z.string().optional(),
      // …any other frontmatter fields you need
    }),
    loader: glob({
      pattern: '**/*.{md,mdx}',       // ← include both .md and .mdx
      base:    './src/content/pages', // ← point at your en/ and fr/ folders
    }),
  }),
};