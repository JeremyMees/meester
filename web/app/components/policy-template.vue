<script setup lang="ts">
import type { Policy } from '~/types/sanity'
import type { BlockMeta, PortableTextValue } from '~/types/blocks'

defineProps<
  BlockMeta & {
    content?: PortableTextValue
    title?: PortableTextValue
    effectiveDate?: Policy['effectiveDate']
    revisedDate?: Policy['revisedDate']
    version?: Policy['version']
  }
>()

const { locale, locales } = useI18n()

const fullLocale = computed(() => {
  const match = locales.value.find(l => l.code === locale.value)
  return match?.language ?? locale.value
})
</script>

<template>
  <article>
    <div class="border-b py-14 sm:pt-24">
      <section class="content-container flex flex-col gap-8">
        <Richtext
          :value="title ?? undefined"
          :components="{
            marks: {
              em: (_, { slots }) =>
                h('em', { class: 'italic text-primary' }, slots.default?.()),
            },
          }"
        />

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-8">
          <span v-if="effectiveDate" class="meta">
            {{ $t('effective') }} —
            <NuxtTime :datetime="effectiveDate" :locale="fullLocale" />
          </span>
          <span v-if="revisedDate" class="meta">
            {{ $t('revised') }} —
            <NuxtTime :datetime="revisedDate" :locale="fullLocale" />
          </span>
          <span v-if="version" class="meta">
            {{ $t('version') }} {{ version }}
          </span>
        </div>
      </section>
    </div>

    <div class="content-container max-w-prose mx-0 py-16 sm:pb-32 richtext">
      <Richtext :value="content ?? undefined" />
    </div>
  </article>
</template>
