<script setup lang="ts">
import type { Marquee } from '#shared/types/sanity'
import type { BlockMeta } from '~/types/blocks'

defineProps<Marquee & BlockMeta>()
</script>

<template>
  <section class="overflow-hidden border-y border-border py-5 group">
    <div class="flex w-max animate-marquee group-hover:paused">
      <div
        v-for="copy in 2"
        :key="copy"
        class="flex shrink-0 items-center gap-14 font-serif text-[32px] italic text-foreground pr-14"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <span
          v-for="(item, i) in items ?? []"
          :key="i"
          class="inline-flex items-center gap-14"
        >
          {{ item }}
          <Icon name="meester:sparkle" class="not-italic text-primary" />
        </span>
      </div>
    </div>
  </section>
</template>
