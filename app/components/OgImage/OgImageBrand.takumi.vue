<script setup lang="ts">
// Static brand template — no per-page title/description. Keeps the OG
// image dependency-free of CJK fonts so it renders reliably on Vercel.
// Switch to dynamic per-page only when we have a Latin-friendly title
// strategy or a self-hosted full CJK font that Takumi can load whole.
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
        radial-gradient(1000px 600px at 0% 0%, rgba(99, 102, 241, 0.4), transparent 60%),
        radial-gradient(900px 500px at 100% 100%, rgba(14, 165, 233, 0.3), transparent 60%);
      color: #f1f5f9;
      font-family: 'Inter', sans-serif;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        font-size: 32px;
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
        gap: 28px;
      "
    >
      <div
        style="
          font-size: 96px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          color: #f1f5f9;
        "
      >
        Ron Chang
      </div>
      <div
        style="
          font-size: 36px;
          font-weight: 400;
          line-height: 1.3;
          color: rgba(241, 245, 249, 0.7);
        "
      >
        Software Engineer · Web & Product Details
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        color: rgba(241, 245, 249, 0.55);
        font-family: 'Inter', monospace;
      "
    >
      <span>Notes · Projects · Writing</span>
      <span>ronchang.dev</span>
    </div>
  </div>
</template>
