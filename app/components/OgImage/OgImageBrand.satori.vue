<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  siteName?: string
}>()
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 80px;
      background-color: #0b1020;
      background-image:
        radial-gradient(1000px 600px at 0% 0%, rgba(99, 102, 241, 0.35), transparent 60%),
        radial-gradient(900px 500px at 100% 100%, rgba(14, 165, 233, 0.25), transparent 60%);
      color: #f1f5f9;
      font-family: 'Inter', sans-serif;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.5px;
        font-family: 'Inter', monospace;
      "
    >
      <span style="color: #818cf8;">ron</span>
      <span style="color: rgba(241, 245, 249, 0.7);">.chang</span>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 24px;
      "
    >
      <div
        style="
          font-size: 64px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -1.5px;
          color: #f1f5f9;
        "
      >
        {{ title || 'Ron Chang' }}
      </div>
      <div
        v-if="description"
        style="
          font-size: 28px;
          font-weight: 400;
          line-height: 1.4;
          color: rgba(241, 245, 249, 0.7);
        "
      >
        {{ description }}
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 22px;
        color: rgba(241, 245, 249, 0.55);
      "
    >
      <span>{{ siteName || 'Ron Chang' }}</span>
      <span style="font-family: monospace;">ronchang.dev</span>
    </div>
  </div>
</template>
