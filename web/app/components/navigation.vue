<script setup lang="ts">
const { data: config } = await useGlobalConfig()

const isSmall = useMediaQuery('(max-width: 767px)')
const mobileNavOpen = ref<boolean>(false)
const header = ref<HTMLElement>()

onClickOutside(header, () => (mobileNavOpen.value = false))

watch(isSmall, (v: boolean) => {
  if (!v && mobileNavOpen.value) mobileNavOpen.value = false
})
</script>

<template>
  <header
    ref="header"
    class="fixed right-0 left-0 top-0 z-10 border-b border-border bg-background py-[22.5px] md:py-6"
  >
    <div class="content-container flex items-center justify-between">
      <NuxtLinkLocale to="/">
        <Logo />
      </NuxtLinkLocale>

      <nav class="hidden md:flex gap-9">
        <SanityLink
          v-for="item in config?.navigation?.links"
          :key="item.name"
          v-bind="item.link"
          class="meta hover:text-foreground transition-colors cursor-pointer"
        >
          {{ item.name }}
        </SanityLink>
      </nav>

      <div class="hidden md:flex items-center gap-9">
        <LocaleSwitch />
        <SanityLink
          v-bind="config?.navigation?.cta?.link"
          class="group meta text-foreground border-b-[1.5px] border-primary pb-0.5 cursor-pointer hidden md:flex items-center gap-1"
        >
          {{ config?.navigation?.cta?.name }}
          <Icon
            name="tabler:arrow-right"
            class="size-4 group-hover:-rotate-45 transition-transform"
          />
        </SanityLink>
      </div>

      <div class="md:hidden flex items-center gap-9">
        <LocaleSwitch />

        <DropdownMenu v-model:open="mobileNavOpen">
          <DropdownMenuTrigger as-child>
            <Button size="icon-sm" variant="outline">
              <Icon name="tabler:menu" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-42" align="end">
            <DropdownMenuItem
              v-for="item in config?.navigation?.links"
              :key="item.name"
              as-child
            >
              <SanityLink v-bind="item.link">
                {{ item.name }}
              </SanityLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem as-child>
              <SanityLink v-bind="config?.navigation?.cta?.link" class="group">
                {{ config?.navigation?.cta?.name }}
                <Icon
                  name="tabler:arrow-right"
                  class="size-4 text-primary group-hover:-rotate-45 group-hover:text-white transition-all"
                />
              </SanityLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
