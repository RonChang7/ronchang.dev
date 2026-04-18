<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  (locales.value as { code: string; name: string }[])
)
</script>

<template>
  <div class="flex items-center gap-1 text-xs font-medium">
    <NuxtLink
      v-for="l in available"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="rounded-md px-2 py-1 transition"
      :class="locale === l.code ? 'bg-surface-hover text-fg' : 'text-fg-subtle hover:text-fg'"
    >
      {{ l.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
