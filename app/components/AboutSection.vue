<script setup lang="ts">
const { t, tm, rt } = useI18n()

const skills = computed(() => (tm('about.skills') as string[]).map(s => rt(s)))
</script>

<template>
  <section id="about" class="container-page py-16 sm:py-24 scroll-mt-20">
    <div class="grid gap-10 md:grid-cols-5">
      <div class="md:col-span-2">
        <h2 class="font-mono text-xs uppercase tracking-widest text-brand-400">
          {{ t('about.eyebrow') }}
        </h2>
        <h3 class="mt-3 text-3xl font-semibold text-white">
          {{ t('about.title') }}
        </h3>
      </div>

      <div class="md:col-span-3 space-y-4 text-white/75 leading-relaxed">
        <p>{{ t('about.paragraph1') }}</p>
        <p>{{ t('about.paragraph2') }}</p>

        <ul class="mt-6 flex flex-wrap gap-2">
          <li
            v-for="skill in skills"
            :key="skill"
            class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
