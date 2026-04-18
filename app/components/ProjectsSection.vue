<script setup lang="ts">
interface Project {
  name: string
  description: string
  stack: string[]
  url?: string
}

const { t, messages, locale } = useI18n()

const projects = computed<Project[]>(() => {
  const raw = (messages.value[locale.value] as any)?.projects?.items
  if (!Array.isArray(raw)) return []
  return raw.map((p: any) => ({
    name: p.name,
    description: p.description,
    stack: p.stack ?? [],
    url: p.url
  }))
})
</script>

<template>
  <section id="projects" class="container-page py-16 sm:py-24 scroll-mt-20">
    <div class="flex items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="font-mono text-xs uppercase tracking-widest text-brand-400">
          {{ t('projects.eyebrow') }}
        </h2>
        <h3 class="mt-3 text-3xl font-semibold text-white">
          {{ t('projects.title') }}
        </h3>
      </div>
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <component
        :is="project.url ? 'a' : 'div'"
        v-for="project in projects"
        :key="project.name"
        :href="project.url"
        :target="project.url ? '_blank' : undefined"
        :rel="project.url ? 'noopener noreferrer' : undefined"
        class="glass group rounded-xl p-5 transition hover:border-white/15"
      >
        <div class="flex items-center justify-between">
          <h4 class="text-lg font-semibold text-white group-hover:text-brand-300">
            {{ project.name }}
          </h4>
          <span v-if="project.url" class="text-white/40 group-hover:text-brand-300" aria-hidden="true">↗</span>
        </div>
        <p class="mt-2 text-sm text-white/70">{{ project.description }}</p>
        <ul class="mt-4 flex flex-wrap gap-1.5">
          <li
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-mono text-white/60"
          >
            {{ tech }}
          </li>
        </ul>
      </component>
    </div>
  </section>
</template>
