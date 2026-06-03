import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    lang: z.enum(['es', 'en', 'de']).default('es'),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    description2: z.string().optional(),
    image: z.string().optional(),
    externalLink: z.string().nullable().optional(),
    githubLink: z.string().nullable().optional(),
    technologies: z.array(z.string()).optional(),
    lang: z.enum(['es', 'en', 'de']).default('es'),
    date: z.date().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
};
