<script lang="ts" setup>
import type { LinkButtonWithSlug } from '~/types/blocks'

const props = defineProps<LinkButtonWithSlug>()

const buttonVariant = props.variant ? stripStega(props.variant) : 'default'
const buttonSize = props.size ? stripStega(props.size) : 'default'
const iconName = props.icon?.name ? stripStega(props.icon.name) : null
</script>

<template>
  <Button v-if="link" :variant="buttonVariant" :size="buttonSize" as-child>
    <NuxtLink :to="link">
      {{ label }}
      <Icon v-if="iconName" :name="iconName" />
    </NuxtLink>
  </Button>
</template>
