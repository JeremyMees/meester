<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="meta flex items-center gap-0.5 select-none">
    <template v-for="({ code }, i) in locales" :key="code">
      <NuxtLink
        :to="switchLocalePath(code).replace(/#.*$/, '')"
        class="size-6 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
        :class="
          locale === code
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        "
      >
        {{ code }}
      </NuxtLink>
      <span v-if="i === 0" aria-hidden="true" class="text-border font-normal">
        /
      </span>
    </template>
  </div>
</template>
