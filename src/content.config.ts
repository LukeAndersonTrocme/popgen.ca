// src/content.config.ts
import { defineCollection, z } from "astro:content";

const base = {
	hero: z.object({
		title: z.string(),
		subtitle: z.string(),
		description: z.string(),
	}),
	/* …other blocks reused (e.g. research, team, news, etc.) */
};

export const collections = {
	en: defineCollection({ schema: z.object(base) }),
	fr: defineCollection({ schema: z.object(base) }),
};
