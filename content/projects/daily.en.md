---
title: AI Daily Briefing
description: A personal news digest curated by Claude every morning — five minutes, the stuff worth knowing.
locale: en
slug: daily
order: 2
stack:
  - Claude API
  - GitHub Actions
  - GitHub Pages
url: https://news.ronchang.dev
status: active
---

# AI Daily Briefing

Every morning, a short digest of the previous day's news — filtered and summarized so I can read it in five minutes.

## Why

- The unread count in my RSS reader had become threatening
- What I actually needed wasn't more sources, but an editor that filters the noise
- An excuse to treat an LLM as a personal assistant, not just a coding copilot

## Pipeline

1. **GitHub Actions** fires at 6:00 every morning
2. Pulls the configured RSS / API sources
3. **Claude** clusters topics, ranks by importance, writes the digest
4. Renders to static HTML, deployed to **GitHub Pages**
5. Webhook notifies me on failure

## Lessons

- Prepping the input with plain code before handing to the LLM beats throwing everything at the model
- Prompt iteration matters more than I expected — a single word can change the whole tone
