<script setup lang="ts">
import { withLeadingSlash } from 'ufo'

const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  return Array.isArray(route.params.slug)
    ? withLeadingSlash(String(route.params.slug.join('/')))
    : withLeadingSlash(String(route.params.slug))
})

const { data } = await useSanityQuery<PageQueryResult>(pageQuery, {
  slug: slug.value,
  language: locale.value,
})

const isHome = computed(() => stripStega(data.value?.documentTitle) === 'Home')

useHead({
  htmlAttrs: { lang: locale },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  title: isHome.value ? undefined : stripStega(data.value?.documentTitle),
})

useSeo(() => data.value?.seo)
</script>

<template>
  <div v-if="data">
    <PageBuilder
      v-if="data._type === 'page'"
      :document-id="data._id"
      :document-type="data._type"
      :content="data.content"
    />
    <PolicyTemplate
      v-else-if="data._type === 'policy'"
      :document-id="data._id"
      :document-type="data._type"
      v-bind="data"
    />
  </div>
  <ErrorPage v-else />
</template>
