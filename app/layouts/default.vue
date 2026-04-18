<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SiteNav />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="container-page py-10 text-sm text-white/50 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>© {{ new Date().getFullYear() }} Ron Chang · {{ t('footer.tagline') }}</p>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/RonChang7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true">
            <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
      <p class="font-mono">built with Nuxt 4 · Tailwind v4</p>
    </footer>
  </div>
</template>
