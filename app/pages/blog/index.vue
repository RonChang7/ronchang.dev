<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('blog.title')} — Ron Chang`,
  description: () => t('blog.pageDescription')
})

const { data: posts } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .order('date', 'DESC')
    .all(),
  { watch: [locale] }
)
</script>

<template>
  <section class="container-page py-16 sm:py-24">
    <header class="mb-10">
      <p class="font-mono text-xs uppercase tracking-widest text-brand-400">
        {{ t('blog.eyebrow') }}
      </p>
      <h1 class="mt-3 text-4xl font-semibold text-white">{{ t('blog.title') }}</h1>
      <p class="mt-3 max-w-2xl text-white/70">{{ t('blog.pageDescription') }}</p>
    </header>

    <div v-if="posts?.length" class="divide-y divide-white/5">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="localePath(`/blog/${post.slug}`)"
        class="group flex flex-col gap-2 py-6 transition sm:flex-row sm:items-baseline sm:justify-between"
      >
        <div>
          <h2 class="text-lg font-semibold text-white group-hover:text-brand-300">
            {{ post.title }}
          </h2>
          <p class="mt-1 text-sm text-white/65">{{ post.description }}</p>
        </div>
        <time class="font-mono text-xs text-white/50 shrink-0">
          {{ new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW') }}
        </time>
      </NuxtLink>
    </div>

    <p v-else class="text-white/60">{{ t('blog.empty') }}</p>
  </section>
</template>
