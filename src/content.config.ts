import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const heresies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/heresies' }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    condemnedBy: z.array(z.string()),
    yearCondemned: z.number(),
    category: z.string(),
    relatedHeresies: z.array(z.string()),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    publishDate: z.date(),
    category: z.enum(['history', 'theology', 'explainer', 'controversy']),
    tags: z.array(z.string()),
    relatedQuestions: z.array(z.number()).optional(),
    relatedHeresies: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
  }),
});

export const collections = { heresies, articles };
