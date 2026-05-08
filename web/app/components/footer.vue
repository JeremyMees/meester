<script setup lang="ts">
const { data: config } = await useGlobalConfig()
</script>

<template>
  <footer
    class="border-t border-border bg-background pt-12 md:pt-20 pb-6 md:pb-10"
  >
    <div
      class="content-container grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-14 items-start mb-20"
    >
      <template v-for="column in config?.footer?.columns" :key="column._key">
        <div>
          <p
            class="font-mono text-xs uppercase tracking-[0.15em] mb-3.5"
            :class="
              column._type === 'footerColumnEmail'
                ? 'text-primary'
                : 'text-muted-foreground'
            "
          >
            {{ column.title ?? '' }}
          </p>

          <SanityLink
            v-if="column._type === 'footerColumnEmail'"
            v-bind="column.link"
            class="font-serif text-[22px] leading-normal text-foreground border-b-[1.5px] border-primary"
          >
            {{ column.email ?? '' }}
          </SanityLink>

          <SanityLink
            v-else-if="column._type === 'footerColumnAddress'"
            v-bind="column.link"
            class="font-serif text-[22px] leading-normal text-foreground m-0 block max-w-50"
          >
            {{ column.address ?? '' }}
          </SanityLink>

          <ul
            v-else-if="column._type === 'footerColumnSocials'"
            class="m-0 list-none p-0 font-sans text-base leading-[2.1] text-foreground"
          >
            <li v-for="social in column.socials" :key="social._key">
              <SanityLink
                v-bind="social.link"
                class="hover:text-primary transition-colors flex items-center gap-1 w-fit"
              >
                {{ social.label }}
                <Icon name="tabler:arrow-up-right" />
              </SanityLink>
            </li>
          </ul>
        </div>
      </template>
    </div>

    <div
      class="content-container mb-10 [&_p]:font-serif font-normal text-foreground [&_p]:text-[clamp(80px,18vw,220px)] [&_p]:leading-[0.85] [&_p]:tracking-[-0.04em]"
    >
      <Richtext
        :value="config?.footer?.title"
        :components="{
          marks: {
            em: (_, { slots }) =>
              h('em', { class: 'italic text-primary' }, slots.default?.()),
          },
        }"
      />
    </div>

    <div
      class="content-container flex flex-col md:flex-row justify-between gap-3 border-t border-border pt-6 meta"
    >
      <span>
        ©{{ new Date().getFullYear() }} Meester Sites —
        {{ $t('allRightsReserved') }}
      </span>

      <span class="flex gap-4">
        <SanityLink
          v-for="policy in config?.footer?.policies"
          :key="policy._key"
          v-bind="policy.link"
          class="hover:text-foreground"
        >
          {{ policy.name }}
        </SanityLink>
      </span>
    </div>
  </footer>
</template>
