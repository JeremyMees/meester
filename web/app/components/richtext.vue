<script lang="ts" setup>
import { PortableText, type PortableTextComponents } from '@portabletext/vue'
import type { PortableTextValue } from '~/types/blocks'

defineProps<{
  value: PortableTextValue
  components?: PortableTextComponents
}>()
</script>

<template>
  <PortableText v-if="value" :value="value" :components="components" />
</template>
