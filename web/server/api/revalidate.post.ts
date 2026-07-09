import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

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

  const urls = await $fetch<{ loc: string }[]>('/api/__sitemap__/urls')

  const results = await Promise.allSettled(
    urls.map(({ loc }) =>
      $fetch.raw(new URL(loc, url).href, {
        headers: { 'x-prerender-revalidate': vercelBypassToken },
      }),
    ),
  )

  const failed = urls
    .map(({ loc }, index) =>
      results[index]?.status === 'rejected' ? loc : null,
    )
    .filter((loc): loc is string => loc !== null)

  return {
    revalidated: urls.length - failed.length,
    failed,
  }
})
