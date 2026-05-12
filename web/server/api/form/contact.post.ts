export default defineEventHandler(async event => {
  const { success, data, error } = await readValidatedBody(event, queries =>
    contactFormSchema.safeParse(queries),
  )

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: error.issues,
    })
  }

  const { plunkApiKey, mailTo, plunkTemplateId } = useRuntimeConfig()

  const result = await $fetch('https://next-api.useplunk.com/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${plunkApiKey}`,
    },
    body: {
      to: mailTo,
      template: plunkTemplateId,
      data: {
        ...data,
        category: data.category.join(', '),
      },
    },
  })

  return result
})
