<script setup lang="ts">
import type { TestimonialSlider } from '~/types/sanity'
import type { BlockMeta, TestimonialSliderItem } from '~/types/blocks'

const props = defineProps<
  TestimonialSlider &
    BlockMeta & {
      testimonials?: TestimonialSliderItem[]
    }
>()

const DURATION = 6000
const selected = ref(0)
const isHovered = ref(false)
const progressKey = ref(0)

const testimonialItems = computed(() => props.testimonials ?? [])
const current = computed(
  () => testimonialItems.value[selected.value] as unknown as Testimonial,
)

function goTo(j: number) {
  selected.value = j
  progressKey.value++
}

function next() {
  selected.value = (selected.value + 1) % testimonialItems.value.length
  progressKey.value++
}

useIntervalFn(() => {
  if (!isHovered.value && testimonialItems.value.length > 1) next()
}, DURATION)
</script>

<template>
  <section
    class="content-container bg-foreground py-24 md:py-32 text-background"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <p
      class="font-mono text-xs uppercase tracking-[0.15em] text-background/50 mb-10"
    >
      {{ preTitle }}
    </p>

    <AnimatePresence mode="wait">
      <Motion
        :key="selected"
        as="blockquote"
        :initial="{ opacity: 0, y: 28 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -16 }"
        :transition="{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }"
        class="m-0 max-w-5xl font-serif text-3xl md:text-5xl font-normal leading-[1.15] tracking-tight"
        style="text-wrap: balance"
      >
        <span class="font-serif italic text-primary">"</span>
        {{ current?.description }}
        <span class="font-serif italic text-primary">"</span>
      </Motion>
    </AnimatePresence>

    <div
      class="mt-14 flex flex-col gap-10 sm:gap-0 sm:flex-row sm:items-end justify-between border-t border-background/20 pt-7"
    >
      <AnimatePresence mode="wait">
        <Motion
          :key="selected"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.35, delay: 0.12, ease: 'easeOut' }"
        >
          <p class="font-serif text-[22px] italic">{{ current?.client }}</p>
          <p
            class="font-mono text-xs uppercase tracking-[0.15em] text-background/50 mt-1"
          >
            {{ current?.name }}
          </p>
        </Motion>
      </AnimatePresence>

      <div class="flex gap-2">
        <button
          v-for="(_, j) in testimonialItems"
          :key="j"
          :aria-label="$t('goToSlide', { index: j + 1 })"
          class="relative h-1 w-9 cursor-pointer overflow-hidden border-none p-0"
          :class="j === selected ? 'bg-background/20' : 'bg-background/20'"
          @click="goTo(j)"
        >
          <Motion
            v-if="j === selected"
            :key="progressKey"
            as="span"
            :initial="{ scaleX: 0 }"
            :animate="{ scaleX: 1 }"
            :transition="{ duration: DURATION / 1000, ease: 'linear' }"
            class="absolute inset-0 block bg-primary origin-left"
          />
          <span v-else class="absolute inset-0 block bg-background/20" />
        </button>
      </div>
    </div>
  </section>
</template>
