<script setup lang="ts">
type ColorKey = 'brand' | 'info' | 'warn' | 'danger' | 'success' | 'mute'

const props = withDefaults(defineProps<{
  color?: ColorKey
}>(), {
  color: 'brand'
})
</script>

<template>
  <span :class="`hl hl-${props.color}`">
    <slot />
  </span>
</template>
