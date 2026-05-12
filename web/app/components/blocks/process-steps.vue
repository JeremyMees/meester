<script setup lang="ts">
import type { ProcessSteps } from '#shared/types/sanity'
import type { BlockMeta } from '~/types/blocks'

defineProps<ProcessSteps & BlockMeta>()
</script>

<template>
  <section id="process" class="content-container py-24 md:py-32">
    <div class="mb-20">
      <p
        class="font-mono text-xs uppercase tracking-[0.15em] mb-4 text-primary"
      >
        {{ preTitle ?? '' }}
      </p>
      <Richtext
        :value="title"
        :components="{
          marks: {
            em: (_, { slots }) =>
              h('em', { class: 'italic text-primary' }, slots.default?.()),
          },
        }"
      />
    </div>

    <div
      class="grid md:grid-cols-2 gap-8"
      :class="{
        'lg:grid-cols-3': (steps?.length ?? 0) === 3,
        'lg:grid-cols-4': (steps?.length ?? 0) >= 4,
      }"
    >
      <div
        v-for="(step, i) in steps ?? []"
        :key="step.title"
        class="border-t border-foreground pt-6"
      >
        <p class="meta mb-5 text-primary">
          {{ excludeStepLabels ? '' : $t('step') }} {{ generateIndex(i) }}
        </p>
        <h3 class="mb-3 font-serif text-3xl font-normal tracking-tight">
          {{ step.title }}
        </h3>
        <p class="text-[15px] leading-relaxed text-muted-foreground">
          {{ step.description }}
        </p>
      </div>
    </div>
  </section>
</template>
