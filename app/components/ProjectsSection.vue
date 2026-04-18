<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData(
  () => `projects-section-${locale.value}`,
  () => queryCollection('projects')
    .where('locale', '=', locale.value)
    .order('order', 'ASC')
    .all(),
  { watch: [locale] }
)
</script>

<template>
  <section id="projects" class="container-page py-16 sm:py-24 scroll-mt-20">
    <div class="flex items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="font-mono text-xs uppercase tracking-widest text-brand-500 dark:text-brand-400">
          {{ t('projects.eyebrow') }}
        </h2>
        <h3 class="mt-3 text-3xl font-semibold text-fg">
          {{ t('projects.title') }}
        </h3>
      </div>
    </div>

    <div v-if="projects?.length" class="grid gap-5 sm:grid-cols-2">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        :to="localePath(`/projects/${project.slug}`)"
        class="glass group rounded-xl p-5 transition hover:border-border-strong"
      >
        <div class="flex items-center justify-between gap-2">
          <h4 class="text-lg font-semibold text-fg group-hover:text-brand-500 dark:group-hover:text-brand-300">
            {{ project.title }}
          </h4>
          <span
            v-if="project.status !== 'active'"
            class="rounded-md bg-surface px-2 py-0.5 text-[11px] font-mono text-fg-subtle"
          >
            {{ t(`projects.status.${project.status}`) }}
          </span>
        </div>
        <p class="mt-2 text-sm text-fg-muted">{{ project.description }}</p>
        <ul class="mt-4 flex flex-wrap gap-1.5">
          <li
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-md bg-surface px-2 py-0.5 text-[11px] font-mono text-fg-muted"
          >
            {{ tech }}
          </li>
        </ul>
      </NuxtLink>
    </div>

    <p v-else class="text-fg-subtle text-sm">
      {{ t('projects.empty') }}
    </p>
  </section>
</template>
