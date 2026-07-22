import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { withoutTrailingSlash } from 'ufo'

const PAGE_TYPES = new Set(['page', 'policy'])

interface WebhookPayload {
  _type?: string
  slug?: string
  language?: string
}

export default defineEventHandler(async event => {
  const { revalidateSecret, vercelBypassToken } = useRuntimeConfig(event)
  const { url } = useRuntimeConfig(event).public
  const signature = getHeader(event, SIGNATURE_HEADER_NAME)
  const body = (await readRawBody(event, 'utf8')) ?? ''

  if (
    !revalidateSecret ||
    !signature ||
    !(await isValidSignature(body, signature, revalidateSecret))
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid signature' })
  }

  if (!vercelBypassToken || !url) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Env variable is not correctly configured',
    })
  }

  const payload = parsePayload(body)

  const paths =
    payload &&
    payload._type &&
    PAGE_TYPES.has(payload._type) &&
    payload.slug &&
    payload.language
      ? [withoutTrailingSlash(toPath(payload.slug, payload.language))]
      : await allPaths()

  const results = await Promise.allSettled(
    paths.map(path =>
      $fetch.raw(new URL(path, url).href, {
        headers: { 'x-prerender-revalidate': vercelBypassToken },
      }),
    ),
  )

  const failed = paths.filter(
    (_, index) => results[index]?.status === 'rejected',
  )

  return {
    scope: paths.length === 1 && payload?._type ? 'document' : 'site',
    revalidated: paths.length - failed.length,
    failed,
  }
})

function parsePayload(body: string): WebhookPayload | null {
  try {
    return JSON.parse(body) as WebhookPayload
  } catch {
    return null
  }
}

async function allPaths(): Promise<string[]> {
  const urls = await $fetch<{ loc: string }[]>('/api/__sitemap__/urls')
  return [...new Set(urls.map(({ loc }) => withoutTrailingSlash(loc)))]
}
