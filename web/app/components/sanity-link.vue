<script lang="ts" setup>
import {
  withQuery,
  withFragment,
  parseQuery,
  parseURL,
  withLeadingSlash,
} from 'ufo'
import type { SanityLink } from '~/types/blocks'
import type { HTMLAttributes } from 'vue'

const BLOCKED_PROTOCOLS = new Set(['javascript', 'vbscript', 'data'])

const props = defineProps<
  SanityLink & {
    class?: HTMLAttributes['class']
  }
>()

const to = computed(() => {
  const urlTo = props.url
  if (!urlTo) return undefined

  const { protocol } = parseURL(urlTo)
  if (protocol && BLOCKED_PROTOCOLS.has(protocol.replace(':', '')))
    return undefined

  let result = withLeadingSlash(urlTo)

  if (props.parameters) {
    const params = stripStega(props.parameters)
    result = withQuery(result, parseQuery(params))
  }

  if (props.anchor) {
    const anchor = stripStega(props.anchor)
    result = withFragment(result, anchor.replace(/^#/, ''))
  }

  return result
})
</script>

<template>
  <NuxtLinkLocale
    v-if="to"
    :to="to"
    :target="blank ? '_blank' : null"
    :class="props.class"
  >
    <slot />
  </NuxtLinkLocale>
</template>
