<script lang="ts" setup>
import type { LinkButton } from '~/types/blocks'

const props = defineProps<LinkButton>()

const buttonVariant = props.variant ? stripStega(props.variant) : 'default'
const buttonSize = props.size ? stripStega(props.size) : 'default'
const iconName = props.icon?.name ? stripStega(props.icon.name) : null
</script>

<template>
  <Button v-if="link" :variant="buttonVariant" :size="buttonSize" as-child>
    <SanityLink v-bind="link">
      {{ label }}
      <Icon v-if="iconName" :name="iconName" />
    </SanityLink>
  </Button>
</template>
