<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: project } = await useAsyncData(
  () => `project-${locale.value}-${route.params.slug}`,
  () => queryCollection('projects')
    .where('locale', '=', locale.value)
    .where('slug', '=', route.params.slug as string)
    .first(),
  { watch: [locale] }
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: () => `${project.value?.title} — Ron Chang`,
  description: () => project.value?.description
})
</script>

<template>
  <article class="container-page py-16 sm:py-24 max-w-3xl">
    <NuxtLink
      :to="localePath('/#projects')"
      class="font-mono text-xs text-fg-subtle hover:text-fg"
    >
      ← {{ t('projects.back') }}
    </NuxtLink>

    <header v-if="project" class="mt-6">
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-if="project.status !== 'active'"
          class="rounded-md bg-surface px-2 py-0.5 text-[11px] font-mono text-fg-subtle"
        >
          {{ t(`projects.status.${project.status}`) }}
        </span>
      </div>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-fg">
        {{ project.title }}
      </h1>
      <p v-if="project.description" class="mt-3 text-lg text-fg-muted">
        {{ project.description }}
      </p>

      <ul class="mt-5 flex flex-wrap gap-1.5">
        <li
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-md bg-surface px-2 py-0.5 text-[11px] font-mono text-fg-muted"
        >
          {{ tech }}
        </li>
      </ul>

      <div v-if="project.url || project.repo" class="mt-6 flex flex-wrap gap-2">
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 dark:hover:bg-brand-400"
        >
          {{ t('projects.visitSite') }} ↗
        </a>
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold text-fg transition hover:bg-surface"
        >
          {{ t('projects.viewRepo') }} ↗
        </a>
      </div>
    </header>

    <div
      class="prose dark:prose-invert prose-headings:text-fg prose-a:text-brand-600 dark:prose-a:text-brand-300 hover:prose-a:text-brand-500 dark:hover:prose-a:text-brand-200 mt-10 max-w-none"
    >
      <ContentRenderer v-if="project" :value="project" />
    </div>
  </article>
</template>
