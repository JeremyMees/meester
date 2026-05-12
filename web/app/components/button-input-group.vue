<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '~/components/ui/button'

const props = withDefaults(
  defineProps<{
    options: ({ value: string; label: string } | string)[]
    multiple?: boolean
    modelValue?: string | string[]
    ariaInvalid?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    multiple: false,
    class: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const normalizedOptions = computed(() =>
  props.options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  ),
)

const isSelected = (value: string) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }

  return props.modelValue === value
}
</script>

<template>
  <ToggleGroupRoot
    :type="multiple ? 'multiple' : 'single'"
    :model-value="modelValue"
    :class="cn('flex flex-wrap gap-2', props.class)"
    @update:model-value="emit('update:modelValue', $event as string | string[])"
  >
    <ToggleGroupItem
      v-for="option in normalizedOptions"
      :key="option.value"
      :value="option.value"
      :aria-invalid="ariaInvalid"
      :class="
        cn(
          buttonVariants({
            variant: isSelected(option.value) ? 'default' : 'outline',
            size: 'sm',
          }),
          props.class,
        )
      "
    >
      {{ option.label }}
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
