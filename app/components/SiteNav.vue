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
  <header class="sticky top-0 z-40 border-b border-white/5 bg-[#0b1020]/70 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between">
      <NuxtLink :to="localePath('/')" class="font-mono text-base tracking-tight">
        <span class="text-brand-400">ron</span><span class="text-white/80">.chang</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6 text-sm text-white/70">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="transition hover:text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <LanguageSwitcher />
    </div>
  </header>
</template>
