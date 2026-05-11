<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

const { locale } = useI18n()
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'en' ? 'en-US' : 'zh-Hant',
    ...i18nHead.value.htmlAttrs
  },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Analytics />
</template>
