import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },
  typescript: { strict: true, typeCheck: false },

  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/color-mode', 'nuxt-studio', '@nuxtjs/seo'],

  site: {
    url: 'https://www.ronchang.dev',
    name: 'Ron Chang',
    description: 'Ron Chang 的個人網站：作品、文章與聯絡資訊。',
    defaultLocale: 'zh'
  },

  // OG image generation handled in a follow-up PR (#17) — needs renderer
  // choice + signing secret setup. Disable here so the SEO module bundle
  // doesn't prompt for it at build time.
  ogImage: {
    enabled: false
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'RonChang7',
      repo: 'ronchang.dev',
      branch: 'main'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'ronchang-color-mode'
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      title: 'Ron Chang — Personal Site',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Ron Chang 的個人網站：作品、文章與聯絡資訊。' },
        { name: 'theme-color', content: '#0f172a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  i18n: {
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    baseUrl: 'https://www.ronchang.dev',
    locales: [
      { code: 'zh', name: '繁體中文', language: 'zh-Hant', file: 'zh.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  content: {
    // Use Node's native SQLite (>=22.5.0) instead of better-sqlite3 to
    // avoid native-binding load failures inside Vercel Functions, which
    // cause SSR queryCollection() to silently return [] in production.
    // https://content.nuxt.com/docs/getting-started/configuration#experimentalsqliteconnector
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 }
      }
    }
  },

  nitro: {
    preset: 'vercel'
  }
})
