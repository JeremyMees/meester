<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="meta flex items-center gap-1 select-none" aria-label="Language">
    <NuxtLink
      v-for="({ code }, i) in locales"
      :key="code"
      :to="switchLocalePath(code).replace(/#.*$/, '')"
      class="cursor-pointer bg-transparent border-0 p-0 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
      :class="
        locale === code
          ? 'text-foreground font-semibold'
          : 'text-muted-foreground hover:text-foreground'
      "
    >
      {{ code }}
      <span v-if="i === 0" aria-hidden="true" class="text-border font-normal"
        >/</span
      >
    </NuxtLink>
  </div>
</template>
