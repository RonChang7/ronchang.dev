<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SiteNav />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="container-page py-10 text-sm text-white/50 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p>© {{ new Date().getFullYear() }} Ron Chang · {{ t('footer.tagline') }}</p>
      <p class="font-mono">built with Nuxt 4 · Tailwind v4</p>
    </footer>
  </div>
</template>
