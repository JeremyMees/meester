<script lang="ts" setup>
import { PortableText } from '@portabletext/vue'
import type {
  PortableTextComponents,
  PortableTextComponentProps,
} from '@portabletext/vue'
import type { PortableTextValue } from '~/types/blocks'
import type { ButtonLink, InlineLink } from '~/types/sanity'

defineProps<{
  value: PortableTextValue
  components?: PortableTextComponents
}>()

const customComponents: PortableTextComponents['types'] = {
  buttonLink: ({ value }: PortableTextComponentProps<ButtonLink>) =>
    h(resolveComponent('LinkButton'), value, () => value.label),
  inlineLink: ({ value }: PortableTextComponentProps<InlineLink>) =>
    h(resolveComponent('SanityLink'), { ...value.link }, () => value.label),
}
</script>

<template>
  <PortableText
    v-if="value"
    :value="value"
    :components="{
      ...components,
      types: {
        ...customComponents,
        ...components?.types,
      },
    }"
  />
</template>
