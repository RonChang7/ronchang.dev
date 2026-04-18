<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: post } = await useAsyncData(
  () => `blog-${locale.value}-${route.params.slug}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('slug', '=', route.params.slug as string)
    .first(),
  { watch: [locale] }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: () => `${post.value?.title} — Ron Chang`,
  description: () => post.value?.description
})
</script>

<template>
  <article class="container-page py-16 sm:py-24 max-w-3xl">
    <NuxtLink
      :to="localePath('/blog')"
      class="font-mono text-xs text-white/50 hover:text-white"
    >
      ← {{ t('blog.back') }}
    </NuxtLink>

    <header v-if="post" class="mt-6">
      <time class="font-mono text-xs text-white/50">
        {{ new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW') }}
      </time>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-white">
        {{ post.title }}
      </h1>
      <p v-if="post.description" class="mt-3 text-lg text-white/70">
        {{ post.description }}
      </p>
    </header>

    <div
      class="prose prose-invert prose-headings:text-white prose-a:text-brand-300 hover:prose-a:text-brand-200 mt-10 max-w-none"
    >
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </article>
</template>
