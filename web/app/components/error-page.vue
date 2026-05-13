<script lang="ts" setup>
const { locale, locales } = useI18n()

const fullLocale = computed(() => {
  const match = locales.value.find(l => l.code === locale.value)
  return match?.language ?? locale.value
})
</script>

<template>
  <section class="content-container py-24 md:py-32">
    <div class="meta mb-10 hidden md:flex justify-between">
      <span>{{ $t('errorPage.preTitle') }}</span>
      <NuxtTime :datetime="new Date()" :locale="fullLocale" />
    </div>

    <div class="flex flex-col gap-4 max-w-prose">
      <h1 class="italic text-primary">404</h1>
      <p class="h3">{{ $t('errorPage.title') }}</p>
      <p class="text-muted-foreground text-sm">{{ $t('errorPage.message') }}</p>
      <Button as-child class="w-fit">
        <NuxtLinkLocale to="/">
          <Icon name="tabler:arrow-left" />
          {{ $t('errorPage.backHome') }}
        </NuxtLinkLocale>
      </Button>
    </div>
  </section>
</template>
