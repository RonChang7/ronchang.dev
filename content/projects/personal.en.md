---
title: Personal Site
description: My personal homepage built with Nuxt 4 + Tailwind v4, bilingual (Chinese / English).
locale: en
slug: personal
order: 1
stack:
  - Nuxt 4
  - Tailwind v4
  - i18n
url: https://ronchang.dev
repo: https://github.com/RonChang7/ronchang.dev
status: active
---

# Personal Site

The site you're looking at right now. A long-lived home for my projects, writing, and notes — instead of scattering them across platforms.

## Why

- Wanted a place I fully control, that won't disappear when a product shuts down
- An excuse to try the Nuxt 4 `app/` directory layout and Tailwind v4 in anger
- Somewhere to collect the small ideas I'd otherwise forget

## Tech highlights

- **Nuxt 4** with the new `app/` directory structure — cleaner than the old setup
- **Tailwind v4** `@theme` + CSS variables for theming — swapping light/dark is one variable group
- **@nuxt/content** drives posts and project pages via frontmatter
- **@nuxtjs/i18n** handles the Chinese / English URLs with the prefix strategy

## Next up

- RSS / Atom feed
- Dynamic OG images
- Comments (Giscus)
