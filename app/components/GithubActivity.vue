<script setup lang="ts">
import type { ActivityItem } from '~~/server/api/github/activity.get'

const { t, locale } = useI18n()

const { data } = await useFetch<{ user: string; items: ActivityItem[]; error?: boolean }>(
  '/api/github/activity',
  { key: 'github-activity' }
)

const dateFormatter = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'zh-TW', {
    month: 'short',
    day: 'numeric'
  })
)

function formatDate(iso: string) {
  return dateFormatter.value.format(new Date(iso))
}

function actionText(item: ActivityItem): string {
  const key = `github.action.${item.type}`
  if (item.type === 'push') {
    return t(key, { count: item.meta?.count ?? 1 })
  }
  return t(key)
}
</script>

<template>
  <section class="container-page py-16 sm:py-24">
    <div class="flex items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="font-mono text-xs uppercase tracking-widest text-brand-500 dark:text-brand-400">
          {{ t('github.eyebrow') }}
        </h2>
        <h3 class="mt-3 text-3xl font-semibold text-fg">
          {{ t('github.title') }}
        </h3>
      </div>
      <a
        v-if="data?.user"
        :href="`https://github.com/${data.user}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-fg-muted hover:text-fg"
      >
        {{ t('github.viewProfile') }}
      </a>
    </div>

    <p v-if="data?.error" class="text-fg-subtle text-sm">
      {{ t('github.loadError') }}
    </p>

    <ul v-else-if="data?.items?.length" class="glass divide-y divide-border rounded-xl">
      <li
        v-for="item in data.items"
        :key="item.id"
        class="flex items-start gap-3 p-4 text-sm"
      >
        <time class="font-mono text-xs text-fg-subtle shrink-0 pt-0.5 w-14">
          {{ formatDate(item.createdAt) }}
        </time>
        <div class="min-w-0 flex-1">
          <p class="text-fg-muted">
            <span>{{ actionText(item) }}</span>
            <a
              :href="item.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 font-mono text-fg hover:text-brand-500 dark:hover:text-brand-300"
            >
              {{ item.repo }}
            </a>
          </p>
          <a
            v-if="item.meta?.title"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-0.5 block truncate text-xs text-fg-subtle hover:text-fg-muted"
          >
            {{ item.meta.title }}
          </a>
        </div>
      </li>
    </ul>

    <p v-else class="text-fg-subtle text-sm">
      {{ t('github.empty') }}
    </p>
  </section>
</template>
