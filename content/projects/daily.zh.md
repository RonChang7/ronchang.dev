---
title: AI 摘要日報
description: 由 Claude 每天清晨自動策展的個人新聞簡報，五分鐘讀完一天該追的事。
locale: zh
slug: daily
order: 2
stack:
  - Claude API
  - GitHub Actions
  - GitHub Pages
url: https://news.ronchang.dev
status: active
---

# AI 摘要日報

每天早上自動把前一天我關心的新聞，壓縮成一封五分鐘可以讀完的短報。

## 為什麼做？

- RSS reader 的未讀數讓人想逃
- 真正需要的不是更多資訊，而是「幫我過濾掉雜訊、只留下值得知道的事」
- 想試試把 LLM 當成個人助理，而不只是寫程式的副駕駛

## 工作流程

1. **GitHub Actions** 每天清晨 6:00 觸發
2. 抓取幾個預先設定好的 RSS / API 來源
3. 用 **Claude** 做主題分群、重要性排序、撰寫摘要
4. 輸出為靜態 HTML，部署到 **GitHub Pages**
5. 失敗時透過 webhook 通知

## 心得

- 比起把「所有事」交給 LLM，先用傳統程式碼把「該餵給它什麼」準備好，品質穩定很多
- Prompt 的迭代比想像中更重要，一個詞的改變會讓整份日報氣質變掉
