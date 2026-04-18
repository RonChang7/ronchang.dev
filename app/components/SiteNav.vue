<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const nav = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/#about'), label: t('nav.about') },
  { to: localePath('/#projects'), label: t('nav.projects') },
  { to: localePath('/blog'), label: t('nav.blog') }
])
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-nav-bg backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between">
      <NuxtLink :to="localePath('/')" class="font-mono text-base tracking-tight">
        <span class="text-brand-500 dark:text-brand-400">ron</span><span class="text-fg-muted">.chang</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6 text-sm text-fg-muted">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="transition hover:text-fg"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
