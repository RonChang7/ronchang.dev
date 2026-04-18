---
title: Personal Site
description: 用 Nuxt 4 + Tailwind v4 打造的個人網站，支援中英雙語。
locale: zh
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

就是你現在看到的這個站。把我個人的作品、文章、想法集中放在一個地方。

## 為什麼做？

- 需要一個可控的長期據點，而不是散落在各個平台
- 同時想試試 Nuxt 4 的新 `app/` 目錄結構與 Tailwind v4 的新寫法
- 順便把多年累積的一些小想法整理成可分享的格式

## 技術重點

- **Nuxt 4** 的 `app/` 目錄結構，比舊版清爽不少
- **Tailwind v4** 的 `@theme` + CSS 變數定義主題，改深色模式只要切換一組變數
- **@nuxt/content** 管理文章與作品集，frontmatter 驅動
- **@nuxtjs/i18n** 提供中英雙語，URL 前綴式策略

## 之後想做什麼

- RSS / Atom feed
- 動態 OG Image
- 留言（Giscus）
