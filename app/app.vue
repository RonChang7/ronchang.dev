<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

const { locale } = useI18n()
useHead({
  htmlAttrs: computed(() => ({ lang: locale.value === 'en' ? 'en-US' : 'zh-Hant' }))
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Analytics />
</template>
