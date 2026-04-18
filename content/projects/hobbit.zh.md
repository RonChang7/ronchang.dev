---
title: Hobbit Tracker
description: 追蹤日常習慣與心情日誌的個人工具，用哈比人的步伐慢慢把每天累積成屬於自己的生活節奏。
locale: zh
slug: hobbit
order: 3
stack:
  - Nuxt 3
  - PrimeVue
  - Supabase
url: https://hobbit-tracker.ronchang.dev
status: active
---

# Hobbit Tracker

一個給自己用的小工具：記錄每天的習慣打卡與心情，把「有沒有做到」這件事變成可以被回顧的資料。

## 為什麼做？

- 市面上多數習慣 app 太花俏，push 通知、徽章、連勝天數反而變成壓力
- 我想要的只是一個安靜的地方，每天記一筆，週末回頭看看自己走得如何
- 「哈比人」是隱喻：不求快，但願意每天往目標走一小步

## 技術重點

- **Nuxt 3** 當 SSR 前端，保留未來接 PWA 的空間
- **PrimeVue** 的 DataView / Chart 拿來做快速 prototype
- **Supabase** 一次搞定 auth + Postgres + row-level security，一個人維護剛好

## 下一步

- 加上「連續週」而不是「連續天」的視角，對斷點更寬容
- 心情日誌結合每週摘要，讓 LLM 協助回顧
