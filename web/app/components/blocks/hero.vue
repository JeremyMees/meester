<script setup lang="ts">
import type { Hero } from '~/types/sanity'
import type { BlockMeta, LinkButton } from '~/types/blocks'

defineProps<Hero & BlockMeta & { buttons: LinkButton[] }>()
</script>

<template>
  <section class="relative px-14 pt-32 pb-24">
    <div class="meta mb-10 hidden md:flex justify-between">
      <span>{{ preTitleOne ?? '' }}</span>
      <span>{{ preTitleTwo ?? '' }}</span>
    </div>

    <Richtext
      :value="title"
      :components="{
        marks: {
          em: (_, { slots }) =>
            h('em', { class: 'italic text-primary' }, slots.default?.()),
        },
      }"
    />

    <div class="mt-20 grid md:grid-cols-[1fr_380px] items-end gap-20">
      <div
        class="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-140"
      >
        <Richtext :value="description" />
      </div>

      <div class="flex flex-wrap gap-3.5">
        <LinkButton
          v-for="(button, index) in buttons"
          :key="index"
          v-bind="button"
        />
      </div>
    </div>
  </section>
</template>
