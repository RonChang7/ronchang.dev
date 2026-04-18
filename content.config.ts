import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        locale: z.enum(['zh', 'en']),
        slug: z.string(),
        tags: z.array(z.string()).optional()
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        locale: z.enum(['zh', 'en']),
        slug: z.string(),
        order: z.number().default(0),
        stack: z.array(z.string()),
        url: z.string().optional(),
        repo: z.string().optional(),
        status: z.enum(['active', 'archived', 'wip']).default('active')
      })
    })
  }
})
