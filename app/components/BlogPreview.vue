<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  () => `blog-preview-${locale.value}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .order('date', 'DESC')
    .limit(3)
    .all(),
  { watch: [locale] }
)
</script>

<template>
  <section class="container-page py-16 sm:py-24">
    <div class="flex items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="font-mono text-xs uppercase tracking-widest text-brand-400">
          {{ t('blog.eyebrow') }}
        </h2>
        <h3 class="mt-3 text-3xl font-semibold text-white">
          {{ t('blog.title') }}
        </h3>
      </div>
      <NuxtLink
        :to="localePath('/blog')"
        class="text-sm text-white/70 hover:text-white"
      >
        {{ t('blog.viewAll') }} →
      </NuxtLink>
    </div>

    <div v-if="posts?.length" class="grid gap-4 sm:grid-cols-3">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="localePath(`/blog/${post.slug}`)"
        class="glass group rounded-xl p-5 transition hover:border-white/15"
      >
        <time class="font-mono text-xs text-white/50">
          {{ new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW') }}
        </time>
        <h4 class="mt-2 text-base font-semibold text-white group-hover:text-brand-300">
          {{ post.title }}
        </h4>
        <p class="mt-2 text-sm text-white/65 line-clamp-3">
          {{ post.description }}
        </p>
      </NuxtLink>
    </div>

    <p v-else class="text-white/60 text-sm">
      {{ t('blog.empty') }}
    </p>
  </section>
</template>
