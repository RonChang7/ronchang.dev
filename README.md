# ronchang.dev

我的個人網站 — 用 **Nuxt 4** + **Tailwind CSS v4** 打造，中英雙語，部署在 Vercel。

## 技術棧

- [Nuxt 4](https://nuxt.com) — Vue 3 / Nitro / 新版 `app/` 目錄結構
- [Tailwind CSS v4](https://tailwindcss.com) — 透過 `@tailwindcss/vite` 外掛
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) v9 — 中英雙語，`prefix_except_default`
- [@nuxt/content](https://content.nuxt.com) v3 — Markdown 部落格
- TypeScript strict 模式

## 目錄結構

```
ronchang.dev/
├── app/                      # Nuxt 4 app source
│   ├── app.vue
│   ├── assets/css/main.css   # Tailwind 進入點 + 主題設計 token
│   ├── components/           # 自動匯入的 Vue 元件
│   ├── layouts/default.vue
│   └── pages/
│       ├── index.vue         # Hero + About + Projects + 部落格摘要
│       └── blog/
│           ├── index.vue
│           └── [slug].vue
├── content/blog/             # Markdown 文章（檔名 .zh.md / .en.md）
├── i18n/locales/             # zh.json / en.json
├── public/                   # favicon、robots 等靜態資源
├── content.config.ts         # Nuxt Content collection schema
├── nuxt.config.ts
└── package.json
```

## 本機開發

```bash
pnpm install        # 或 npm install / yarn
pnpm dev            # http://localhost:3000
```

## 部署（Vercel）

```bash
pnpm build          # 輸出到 .output/，Vercel preset 已在 nuxt.config.ts 設定
```

推到 GitHub 之後，在 Vercel import 這個 repo 即可；Nuxt 會自動被偵測。綁定自訂網域（ronchang.dev）在 Vercel 的 Domains 設定裡完成。

## 新增一篇文章

1. 在 `content/blog/` 新增兩個檔案：`my-post.zh.md` 與 `my-post.en.md`
2. Frontmatter 必須包含 `title / description / date / locale / slug`
3. 兩種語系共用同一個 `slug`，URL 會是 `/blog/my-post` 與 `/en/blog/my-post`

## 升級到 Nuxt 5

目前已經用 Nuxt 4 的 `app/` 目錄結構與 `future.compatibilityVersion = 4`，未來升級只需要：

1. 升級 `nuxt` 到 5.x
2. 跟著官方 upgrade guide 調整 breaking changes
3. 移除 `future.compatibilityVersion` 設定

## License

MIT
