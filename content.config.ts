import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().default(0),
  stack: z.array(z.string()),
  url: z.string().optional(),
  repo: z.string().optional(),
  status: z.enum(['active', 'archived', 'wip']).default('active')
})

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional()
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: blogSchema
    }),
    blogEn: defineCollection({
      type: 'page',
      source: 'en/blog/**/*.md',
      schema: blogSchema
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: projectSchema
    }),
    projectsEn: defineCollection({
      type: 'page',
      source: 'en/projects/**/*.md',
      schema: projectSchema
    })
  }
})
