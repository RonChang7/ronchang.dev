<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `Ron Chang — ${t('hero.role')}`,
  description: () => t('hero.description')
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <BlogPreview />
  </div>
</template>
