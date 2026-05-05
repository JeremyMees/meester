<script lang="ts" setup>
defineProps<{
  documentId: string
  documentType: string
  content: NonNullable<NonNullable<PageQueryResult>['content']> | null
}>()

const blockComponents: Record<string, ReturnType<typeof resolveComponent>> = {
  hero: resolveComponent('BlocksHero'),
  marquee: resolveComponent('BlocksMarquee'),
  projectOverview: resolveComponent('BlocksProjectOverview'),
}
</script>

<template>
  <template v-if="Array.isArray(content)">
    <div v-for="block in content" :key="block._key">
      <component
        :is="blockComponents[block._type] ?? 'div'"
        v-bind="block"
        :document-id="documentId"
        :document-type="documentType"
      />
    </div>
  </template>
</template>
