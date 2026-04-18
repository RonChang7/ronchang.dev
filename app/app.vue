<script setup lang="ts">
const { locale } = useI18n()
useHead({
  htmlAttrs: computed(() => ({ lang: locale.value === 'en' ? 'en-US' : 'zh-Hant' }))
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
