import { queryCollection } from '@nuxt/content/server'

/**
 * Feeds @nuxtjs/sitemap with every @nuxt/content page across all four
 * per-locale collections. Without this the sitemap only lists the static
 * Vue pages and misses every blog post / project detail.
 */
export default defineSitemapEventHandler(async (event) => {
  const [blogZh, blogEn, projZh, projEn] = await Promise.all([
    queryCollection(event, 'blog').all(),
    queryCollection(event, 'blogEn').all(),
    queryCollection(event, 'projects').all(),
    queryCollection(event, 'projectsEn').all()
  ])

  return [
    ...blogZh.map(p => ({ loc: p.path, lastmod: p.date })),
    ...blogEn.map(p => ({ loc: p.path, lastmod: p.date })),
    ...projZh.map(p => ({ loc: p.path })),
    ...projEn.map(p => ({ loc: p.path }))
  ]
})
