import { Buffer } from 'node:buffer'
import process from 'node:process'
import { put } from '@vercel/blob'

/**
 * Image upload endpoint backed by Vercel Blob.
 *
 * Auth: HTTP Basic Auth. Browser will prompt the first time on each session.
 *   env: UPLOAD_USER (default "admin"), UPLOAD_PASSWORD (required)
 *
 * Body: multipart/form-data with a single `file` field.
 * Returns: { url } — public Blob URL ready to embed in markdown.
 */
export default defineEventHandler(async (event) => {
  const expectedUser = process.env.UPLOAD_USER || 'admin'
  const expectedPassword = process.env.UPLOAD_PASSWORD

  if (!expectedPassword) {
    throw createError({ statusCode: 500, statusMessage: 'UPLOAD_PASSWORD is not configured' })
  }

  const auth = getRequestHeader(event, 'authorization')
  if (!auth?.startsWith('Basic ')) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Upload"')
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }

  const decoded = Buffer.from(auth.slice('Basic '.length), 'base64').toString('utf-8')
  const colonAt = decoded.indexOf(':')
  const user = decoded.slice(0, colonAt)
  const password = decoded.slice(colonAt + 1)
  if (user !== expectedUser || password !== expectedPassword) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Upload"')
    throw createError({ statusCode: 401, statusMessage: 'Bad credentials' })
  }

  const form = await readMultipartFormData(event)
  const fileEntry = form?.find(p => p.name === 'file' && p.filename && p.data)
  if (!fileEntry) {
    throw createError({ statusCode: 400, statusMessage: 'Missing `file` field' })
  }

  const MAX_SIZE = 4 * 1024 * 1024 // 4 MB — under Vercel's 4.5 MB body limit
  if (fileEntry.data.length > MAX_SIZE) {
    throw createError({ statusCode: 413, statusMessage: 'File too large (max 4 MB)' })
  }

  const ALLOWED = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif', 'image/svg+xml']
  if (!fileEntry.type || !ALLOWED.includes(fileEntry.type)) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported type: ${fileEntry.type ?? 'unknown'}` })
  }

  const safeName = (fileEntry.filename ?? 'upload').replace(/[^a-zA-Z0-9._-]/g, '-')
  const result = await put(`uploads/${safeName}`, fileEntry.data, {
    access: 'public',
    contentType: fileEntry.type,
    addRandomSuffix: true
  })

  return { url: result.url }
})
