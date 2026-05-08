<script setup lang="ts">
import type { ServicesGrid } from '#shared/types/sanity'
import type { BlockMeta } from '~/types/blocks'

defineProps<ServicesGrid & BlockMeta>()
</script>

<template>
  <section id="services" class="content-container bg-secondary py-24 md:py-32">
    <div class="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-20">
      <div>
        <p
          class="font-mono text-xs uppercase tracking-[0.15em] mb-4 text-primary"
        >
          {{ preTitle }}
        </p>
        <Richtext :value="title" />
      </div>

      <div class="flex flex-col">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="grid md:grid-cols-[60px_1fr_1fr] gap-2 md:gap-10 border-t last:border-b py-9"
        >
          <span class="meta tracking-widest">{{ generateIndex(i) }}</span>

          <h3
            class="font-serif text-4xl font-normal tracking-tight text-foreground"
          >
            {{ service.title }}
          </h3>

          <div>
            <p class="mb-4 text-base leading-relaxed text-muted-foreground">
              {{ service.description }}
            </p>
            <ul
              class="m-0 list-none p-0 font-mono text-xs tracking-wide text-foreground"
            >
              <li
                v-for="point in service.points"
                :key="point"
                class="py-1.5 list-disc list-inside first:border-none border-t border-dashed"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
