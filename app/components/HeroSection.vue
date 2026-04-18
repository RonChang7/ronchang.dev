<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="container-page pt-20 pb-24 sm:pt-28 sm:pb-32">
    <p class="font-mono text-xs uppercase tracking-widest text-brand-500 dark:text-brand-400">
      {{ t('hero.greeting') }}
    </p>
    <h1 class="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-fg">
      {{ t('hero.name') }}
    </h1>
    <p class="mt-3 text-xl sm:text-2xl text-fg-muted">
      {{ t('hero.role') }}
    </p>
    <p class="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-fg-muted">
      {{ t('hero.description') }}
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <NuxtLink
        :to="localePath('/#projects')"
        class="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600 dark:hover:bg-brand-400"
      >
        {{ t('hero.ctaPrimary') }}
      </NuxtLink>
      <NuxtLink
        :to="localePath('/blog')"
        class="inline-flex items-center rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-fg transition hover:bg-surface"
      >
        {{ t('hero.ctaSecondary') }}
      </NuxtLink>
    </div>
  </section>
</template>
