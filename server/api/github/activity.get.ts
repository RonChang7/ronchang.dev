interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string; url: string }
  payload: Record<string, unknown>
}

export interface ActivityItem {
  id: string
  type:
    | 'push'
    | 'pr_opened'
    | 'pr_merged'
    | 'pr_closed'
    | 'issue_opened'
    | 'issue_closed'
    | 'create_repo'
    | 'create_branch'
    | 'create_tag'
    | 'fork'
    | 'star'
    | 'release'
    | 'comment'
    | 'other'
  createdAt: string
  repo: string
  repoUrl: string
  url: string
  meta?: { count?: number; title?: string }
}

const GITHUB_USER = 'RonChang7'
const MAX_ITEMS = 8

function mapEvent(ev: GitHubEvent): ActivityItem | null {
  const repoUrl = `https://github.com/${ev.repo.name}`
  const base = {
    id: ev.id,
    createdAt: ev.created_at,
    repo: ev.repo.name,
    repoUrl
  }

  switch (ev.type) {
    case 'PushEvent': {
      const commits = (ev.payload.commits as unknown[] | undefined) ?? []
      const ref = (ev.payload.ref as string | undefined) ?? ''
      const branch = ref.replace(/^refs\/heads\//, '')
      return {
        ...base,
        type: 'push',
        url: branch ? `${repoUrl}/commits/${branch}` : repoUrl,
        meta: { count: commits.length }
      }
    }
    case 'PullRequestEvent': {
      const action = ev.payload.action as string
      const pr = ev.payload.pull_request as { html_url: string; title: string; merged?: boolean } | undefined
      let type: ActivityItem['type'] = 'pr_opened'
      if (action === 'closed') type = pr?.merged ? 'pr_merged' : 'pr_closed'
      else if (action === 'opened' || action === 'reopened') type = 'pr_opened'
      return {
        ...base,
        type,
        url: pr?.html_url ?? repoUrl,
        meta: { title: pr?.title }
      }
    }
    case 'IssuesEvent': {
      const action = ev.payload.action as string
      const issue = ev.payload.issue as { html_url: string; title: string } | undefined
      return {
        ...base,
        type: action === 'closed' ? 'issue_closed' : 'issue_opened',
        url: issue?.html_url ?? repoUrl,
        meta: { title: issue?.title }
      }
    }
    case 'CreateEvent': {
      const refType = ev.payload.ref_type as string
      const ref = (ev.payload.ref as string | undefined) ?? ''
      if (refType === 'repository') {
        return { ...base, type: 'create_repo', url: repoUrl }
      }
      if (refType === 'branch') {
        return { ...base, type: 'create_branch', url: `${repoUrl}/tree/${ref}`, meta: { title: ref } }
      }
      if (refType === 'tag') {
        return { ...base, type: 'create_tag', url: `${repoUrl}/releases/tag/${ref}`, meta: { title: ref } }
      }
      return null
    }
    case 'ForkEvent':
      return { ...base, type: 'fork', url: repoUrl }
    case 'WatchEvent':
      return { ...base, type: 'star', url: repoUrl }
    case 'ReleaseEvent': {
      const release = ev.payload.release as { html_url: string; name: string; tag_name: string } | undefined
      return {
        ...base,
        type: 'release',
        url: release?.html_url ?? repoUrl,
        meta: { title: release?.name || release?.tag_name }
      }
    }
    case 'IssueCommentEvent':
    case 'PullRequestReviewCommentEvent':
    case 'CommitCommentEvent': {
      const target = (ev.payload.issue as { html_url?: string; title?: string } | undefined)
        ?? (ev.payload.pull_request as { html_url?: string; title?: string } | undefined)
        ?? (ev.payload.comment as { html_url?: string } | undefined)
      return {
        ...base,
        type: 'comment',
        url: target?.html_url ?? repoUrl,
        meta: { title: (target as { title?: string } | undefined)?.title }
      }
    }
    default:
      return null
  }
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'cache-control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800')

  try {
    const events = await $fetch<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`,
      {
        headers: {
          'user-agent': 'ronchang.dev',
          accept: 'application/vnd.github+json',
          'x-github-api-version': '2022-11-28'
        }
      }
    )

    const items = events
      .map(mapEvent)
      .filter((x): x is ActivityItem => x !== null)
      .slice(0, MAX_ITEMS)

    return { user: GITHUB_USER, items }
  }
  catch {
    return { user: GITHUB_USER, items: [] as ActivityItem[], error: true }
  }
})
