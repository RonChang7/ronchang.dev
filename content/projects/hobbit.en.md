---
title: Hobbit Tracker
description: A personal tracker for daily habits and mood journaling — small check-ins that stack into the rhythm you want.
locale: en
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

A small tool I built for myself: log daily habit check-ins and mood notes, and turn "did I actually do it" into something I can look back on.

## Why

- Most habit apps are too loud — streaks, badges, push notifications turn into their own pressure
- I just wanted a quiet place to jot one line a day, and read it back on the weekend
- "Hobbit" is the metaphor: no rush, just a small step toward the destination every day

## Tech highlights

- **Nuxt 3** on the front end, SSR — leaves room to turn it into a PWA later
- **PrimeVue** DataView / Chart for quick prototyping
- **Supabase** handles auth + Postgres + row-level security in one go, perfect for a solo app

## Next up

- "Consecutive weeks" rather than "consecutive days" — more forgiving when life happens
- Tie mood entries to a weekly summary, let an LLM help me reflect
