<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()

const slug = computed(() =>
  Array.isArray(route.params.slug)
    ? withLeadingSlash(String(route.params.slug.join('/')))
    : withLeadingSlash(String(route.params.slug)),
)

const { data: page } = await useAsyncData(
  'page-' + slug.value,
  async () => {
    const collection = ('content_' + locale.value) as keyof Collections
    const content = await queryCollection(collection).path(slug.value).first()

    if (!content && locale.value !== 'nl') {
      return await queryCollection('content_nl').path(slug.value).first()
    }

    return content
  },
  {
    watch: [locale],
  },
)
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else>
    <h1>Page not found</h1>
    <p>This page doesn't exist in {{ locale }} language.</p>
  </div>
</template>
