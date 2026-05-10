---
title: 把每日早報從靜態 HTML 搬到 Nuxt 4 SSG
description: 一天之內救活壞掉的 cron、發了 8 個 PR、把 build 流程從 GitHub Actions inline HTML 換成 Vercel 接手 nuxt generate。
date: 2026-05-10
tags:
  - nuxt
  - vercel
  - github-actions
  - 紀錄
---

今天本來只是想處理 issue tracker 裡堆了一個禮拜的「早報產生失敗」通知，後來一路修到把整個前端從靜態 HTML 搬成 Nuxt 4 SSG。記一下時間軸跟過程中的決定。

## 早上：救活壞掉的自動化

- **發現問題**：每日 cron 排程已連續多天失敗，issue tracker 累積 25 張「早報產生失敗」issue
- **根因**：`CLAUDE_CODE_OAUTH_TOKEN` secret 的值格式錯誤（不是標準 `sk-ant-oat01-...` 開頭）
- **修復**：本機重跑 `claude setup-token` 取得正確 token，更新 GitHub secret

## 中午：工作流可靠性提升（4 個 PR）

| PR      | 改動                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| **#31** | workflow timeout 30 → 60 分鐘；每日則數 15–25 → 10–15（避免 Claude 跑太久超時）                                                 |
| **#33** | 失敗時把壞掉的 JSON 上傳成 artifact 保留 14 天，方便 debug                                                                      |
| **#35** | JSON 語法錯誤時自動跑 `jsonrepair` 修復（漏逗號、智慧引號等小錯能自動救起）                                                                 |
| **#36** | push 衝突時自動 `git pull --rebase --autostash` 重試 3 次；順手修一個會「假成功」的 bug —— loop 結尾的 `sleep 3` 讓 step 顯示成功但其實 push 失敗 |

結果：workflow 跑通，今日早報 11 則順利產出，**關掉所有 25 張舊 issue**。

## 下午：架構大遷移 — 純 HTML 靜態站 → Nuxt 4 SSG

原本是 `build.mjs` 把 JSON 灌進 template 產 HTML、commit 進 repo 給 GitHub Pages / Vercel serve；新架構讓 Vercel 自己跑 `nuxt generate`。

5 個 PR 分階段切換：

- **#40** — 在 `nuxt/` 子資料夾建 Nuxt 4 骨架（pages、`IssueView`、SSG 路由通過）
- **#41** — 互動層：theme toggle、archive link、reader overlay、收藏 / 已讀，全部 composable + `localStorage` 持久化
- **#42** — parity 補完：`feed.xml` 用 Nitro server route、手機分類下拉、天氣 emoji、`SiteFooter`
- **#43** — workflow 瘦身只 commit `data/`，刪掉所有舊靜態檔（`scripts/build.mjs`、`template/`、根 `index.html`、各日 `YYYY-MM-DD/`）
- **#44** — `/favorites/` 集中頁列出跨日收藏 + FAB 浮動選單（合併「收藏」「回頂」按鈕，避免浮動按鈕爆量）

Vercel UI 那一步：Project Settings → Root Directory 改成 `nuxt`，Vercel 自動偵測 Nuxt 框架接手 build。

**驗證**：`news.ronchang.dev` 切換到 Nuxt 版本，所有路由 200，workflow 手動觸發確認新流程（只 commit JSON、Vercel 自動 build）。

## 設計決策記錄

- **為什麼搬 Nuxt**：dogfood 自家技術棧、元件化避免 template inline 重複、加新功能更快
- **為什麼讓 Vercel build 而不是 GitHub Actions build**：職責分離（資料在 git、build 產物不在）、Vercel 對 Nuxt 一等公民支援
- **為什麼 FAB 而不是更多浮動按鈕**：右下單一主按鈕 hover 展開，避免畫面被按鈕淹沒
- **mobile breakpoint 修正**：浮動按鈕在 600–860px 區間會撞 masthead，把單欄佈局擴到 ≤860px

## 數字

- 今日 commit：14 個（不算 PR squash）
- 開的 PR：8 個（#31, #33, #35, #36, #40, #41, #42, #43, #44）
- 關掉的 issue：25 張
- 程式碼新增 / 刪除：+\~1500 / -5058（主要是刪掉舊 inline HTML build 產物）
- 上線新功能：jsonrepair 自動修、artifact 保留、Nuxt 全套、收藏集中頁、FAB 選單
