<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({ title: 'Upload — Ron Chang', robots: 'noindex, nofollow' })

interface Item {
  filename: string
  url: string
  markdown: string
  copied: boolean
}

const items = ref<Item[]>([])
const dragging = ref(false)
const error = ref<string | null>(null)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

async function uploadOne(file: File) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: form, credentials: 'same-origin' })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText || (await res.text())}`)
  }
  const data = await res.json() as { url: string }
  const altBase = file.name.replace(/\.[^.]+$/, '')
  return {
    filename: file.name,
    url: data.url,
    markdown: `![${altBase}](${data.url})`,
    copied: false
  } satisfies Item
}

async function handleFiles(fileList: FileList | File[]) {
  const files = Array.from(fileList).filter(f => f.type.startsWith('image/'))
  if (!files.length) {
    error.value = 'Only image files are accepted.'
    return
  }
  error.value = null
  uploading.value = true
  try {
    const results = await Promise.allSettled(files.map(uploadOne))
    const ok: Item[] = []
    const failures: string[] = []
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') ok.push(r.value)
      else failures.push(`${files[i]!.name}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`)
    })
    items.value = [...ok, ...items.value]
    if (failures.length) error.value = failures.join('\n')
  }
  finally {
    uploading.value = false
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer?.files) void handleFiles(e.dataTransfer.files)
}

function onPick(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) void handleFiles(input.files)
  input.value = ''
}

async function copy(item: Item) {
  try {
    await navigator.clipboard.writeText(item.markdown)
    item.copied = true
    setTimeout(() => { item.copied = false }, 1500)
  }
  catch {
    error.value = 'Clipboard write failed'
  }
}
</script>

<template>
  <main class="container-page py-12">
    <header class="mb-8">
      <h1 class="text-2xl font-semibold text-fg">Image upload</h1>
      <p class="mt-1 text-sm text-fg-muted">
        Drop images here. They go to Vercel Blob and you get a markdown snippet to paste into Studio.
      </p>
    </header>

    <div
      class="glass rounded-xl p-10 text-center transition"
      :class="[
        dragging ? 'border-brand-500 bg-surface-hover' : 'border-border',
        uploading ? 'opacity-60 pointer-events-none' : ''
      ]"
      @dragenter.prevent="dragging = true"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop="onDrop"
      @click="fileInput?.click()"
    >
      <p class="text-fg">
        {{ uploading ? 'Uploading…' : 'Drag images here, or click to choose' }}
      </p>
      <p class="mt-1 text-xs text-fg-subtle">
        png · jpeg · gif · webp · avif · svg · max 4 MB each
      </p>
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="onPick"
      >
    </div>

    <p v-if="error" class="mt-4 whitespace-pre-line text-sm text-red-400">
      {{ error }}
    </p>

    <ul v-if="items.length" class="mt-8 space-y-3">
      <li
        v-for="item in items"
        :key="item.url"
        class="glass flex items-center gap-4 rounded-xl p-3"
      >
        <img :src="item.url" :alt="item.filename" class="h-16 w-16 rounded-md object-cover">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-fg">{{ item.filename }}</p>
          <code class="block truncate font-mono text-xs text-fg-muted">{{ item.markdown }}</code>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-md border border-border-strong px-3 py-1.5 text-xs font-semibold text-fg transition hover:bg-surface"
          @click="copy(item)"
        >
          {{ item.copied ? 'Copied!' : 'Copy markdown' }}
        </button>
      </li>
    </ul>
  </main>
</template>
