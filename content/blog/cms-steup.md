---
title: 一個下午把個人網站從靜態 blog 變成可編輯的 CMS
description: 從上完三個功能、修壞掉的 SSR、接 Nuxt Studio、到自己接 Vercel Blob 寫圖片上傳。一連串的小坑與選擇。
seo:
  title: Cms-steup file
  description: 從上完三個功能、修壞掉的 SSR、接 Nuxt Studio、到自己接 Vercel Blob 寫圖片上傳。一連串的小坑與選擇。
tags:
  - nuxt
  - vercel
date: 2026-05-10
---

今天本來只是想做幾個小功能，結果一路做下去整個下午就沒了，順手把這個站從「git 寫 markdown」升級成「在瀏覽器裡寫文章 + 拖圖片」。記一下走過的路。

## 上午：三個功能上線

開工前先列了想做的清單：

- 深色模式
- GitHub 活動牆
- 作品集詳情頁

選擇的時候心裡有原則：能用平台原生的就不自建。深色模式直接用 `@nuxtjs/color-mode`，CSS 重構成語義化 token`fgsurfaceborder` 這種），切換主題只改一組變數。

GitHub 活動牆寫了一個 Nitro server route`/api/github/activity`）抓 `users/:user/events/public`，把 PushEvent / PullRequestEvent / IssuesEvent 之類正規化成 10 種動作類型，前端跑時間軸。重點是\*\*一定要有 cache header\*\*，GitHub API rate limit 沒有 token 是 60 / 小時。

作品集從 i18n JSON 搬到 `@nuxt/content` collection，每個專案一個 markdown，有 frontmatter（stack、url、repo、status）也有 long-form 內文。順便做了 `/projects/[slug]` 詳情頁。

三件事三個 commit、一個 PR，merge 上線。

## 下午第一坑：production 首頁是空的

merge 完一上線發現首頁的「最近作品」「最近文章」全是空的 — 顯示「還沒有作品」「還沒有文章」。但 dev 模式正常。

更詭異的是：點進文章再點回首頁，作品就有了。

熟悉的味道：\*\*SSR 拿不到資料、CSR 補上\*\*`@nuxt/content` v3 把所有內容打包成 SQLite 在 build 時編進 server bundle，但 `better-sqlite3` 的 native binding 在 Vercel Functions（Node 24）載入失敗，query 直接 silent return `[]`。client 端透過 API route 走另一條路徑反而成功，於是「navigation 後就看到」。

修法是改用 Node 22.5+ 內建的 SQLite：

`\`\\\`ts

content: {

experimental: { sqliteConnector: 'native' }

}

`\`\\\`

一行 config，問題消失。Vercel 預設 Node 24 滿足要求，這個問題在 nuxt/content#3689 也有同樣討論。

**收穫**：本地 dev 過 ≠ production 過。Vercel Functions 的執行環境跟本地 Node 還是有差，特別是 native bindings。

## 下半場：把網站變成可編輯的 CMS

寫到一半想：「下次想新增文章不要再切到本地、開 IDE、手寫 markdown、git push 了。能不能直接在手機或 iPad 上寫？」

Nuxt 生態系剛好有 **Nuxt Studio** — 半年前還是 [nuxt.studio](http://nuxt.studio) 雲端 dashboard，現在改架構變成 self-hosted 開源 module，跑在你自己的部署裡。安裝：

`\`\\\`bash

npx nuxi module add nuxt-studio

`\`\\\`

設定 `studio.repository`，到 production `/_studio` 就有 CMS 介面。

但接的過程踩了幾個雷：

### 雷 1：搞混 SSO 跟 Dashboard

第一次點開 [nuxt.studio](http://nuxt.studio)，看到一個「歡迎登入」頁面，列了一堆 connected websites（Atinux、NuxtHub、Docus...），找不到「import repo」按鈕。

那個頁面是 **Nuxt 系列服務的 SSO**，不是 Studio 本體。Studio 已經沒有雲端 dashboard 了，要去自己部署的網站上開 `/_studio`。

### 雷 2：OAuth callback URL 寫錯

Studio 用 GitHub OAuth 認證使用者，需要建一個 GitHub OAuth App。callback URL 一個字都不能差：

`\`\\\`

<https://www.ronchang.dev/__nuxt_studio/auth/github>

`\`\\\`

我第一次填 `/api/_studio/auth/github/callback`（憑「應該長這樣」的記憶寫），整個 OAuth flow 跳「redirect\_uri not associated with this application」。後來查 module source code 才確認真實路徑。

### 雷 3：預覽 404

進 Studio 編輯時，右側即時預覽窗每改一個字就 404 一次。

原因是 Studio 用「檔案路徑」推算 URL`content/blog/hello-world.zh.md` → `/blog/hello-world.zh`。但我之前的路由是用 frontmatter 的 `slug` + `locale` 過濾：URL 是 `/blog/hello-world` (zh) 或 `/en/blog/hello-world` (en)。\*\*檔案路徑跟 URL 對不上\*\*。

改法是把內容結構重組，讓檔案路徑 = URL：

`\`\\\`

content/blog/[hello-world.md](http://hello-world.md) → /blog/hello-world (zh, 預設)

content/en/blog/[hello-world.md](http://hello-world.md) → /en/blog/hello-world (en)

content/projects/[personal.md](http://personal.md) → /projects/personal (zh)

content/en/projects/[personal.md](http://personal.md) → /en/projects/personal (en)

`\`\\\`

`content.config.ts` 把每個 collection 拆成兩個 `blog` / `blogEn`)，page 元件根據 i18n locale 選對應 collection。一勞永逸。

代價是 **檔名 = URL = 永久承諾**。發布後改檔名 = 舊 URL 壞掉。對個人 blog 這個 trade-off 我接受 — 命名時想清楚，少數需要改就加 301 redirect。

## 圖片：Studio media library 不夠用

## Studio 雖然有內建 media library，但設計上把圖片\*\*直接 commit 到 git repo 的 public/ 資料夾\*\*。對於只放 logo / icon 沒問題，但放文章截圖一年下來 repo 會炸。

研究了一下原始碼，Studio 的 media handler 直接 `import { blob } from "hub:blob"` —— 寫死綁 NuxtHub 的 blob abstraction，沒有 expose 切換 storage 的入口。

於是另開一條路：自建 `/admin/upload` 頁面，獨立於 Studio，把圖片直接傳到 **Vercel Blob**。流程：

1\. 拖圖到 `/admin/upload`

2\. server route 做 HTTP Basic Auth → put 到 Vercel Blob → 回傳 public URL

3\. 顯示 `![alt](url)` markdown，一鍵複製

4\. 切到 Studio 文章貼上去

圖片完全不進 git，Vercel Blob 個人站等級每月 $0。簡單暴力，但 work。

## 學到的一些事

**「平台」會把細節藏起來，但有時候會洩漏出來咬你。** Better-sqlite3 native binding、Vercel Functions Node version、@nuxt/content build pipeline，這些都是平常看不到的東西，但只要其中一環跟預期不一樣就會 silent fail。

**SSR 跟 CSR 是兩條獨立的路徑，行為可能不一樣。** 「點過去再點回來就好了」這種詭異 bug 多半是 SSR 失敗 + CSR fallback。

**每個工具都有它的 idioms，要嘛接受、要嘛繞開。** Studio 預設「檔名 = 路徑」、media library 鎖在 NuxtHub blob、OAuth callback 路徑寫死 — 這些都不是 bug，是設計選擇。我能做的是調整自己的內容結構去配合它（refactor 路由），或繞過去自己接（圖片走 Vercel Blob）。

**checklist 一定要在乾淨環境跑一次。** 那個首頁空白 bug 如果我 deploy 後沒順手點一下首頁就不會發現 — 然後它會默默壞著一整個禮拜。
