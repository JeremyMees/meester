<script setup lang="ts">
const socials = ['LinkedIn', 'Instagram']
</script>

<template>
  <footer
    class="border-t border-border bg-background pt-12 md:pt-20 pb-6 md:pb-10"
  >
    <div
      class="content-container grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-14 items-start mb-20"
    >
      <div>
        <p
          class="font-mono text-xs uppercase tracking-[0.15em] text-primary mb-3.5"
        >
          Get in touch
        </p>
        <NuxtLink
          href="mailto:hello@meestersites.be"
          class="font-serif text-[22px] leading-normal text-foreground border-b-[1.5px] border-primary"
        >
          hello@meestersites.be
        </NuxtLink>
      </div>

      <div>
        <p
          class="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3.5"
        >
          Location
        </p>
        <p class="font-serif text-[22px] leading-normal text-foreground m-0">
          Smodderpotstraat 15<br />3293 Kaggevinne, BE
        </p>
        <!-- <p class="meta mt-3">BE 0784.291.103</p> -->
      </div>

      <div>
        <p
          class="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3.5"
        >
          Socials
        </p>
        <ul
          class="m-0 list-none p-0 font-sans text-base leading-[2.1] text-foreground"
        >
          <li v-for="social in socials" :key="social">
            <NuxtLink
              target="_blank"
              class="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              {{ social }}
              <Icon name="lucide:arrow-up-right" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="content-container font-serif font-normal text-[clamp(80px,18vw,220px)] leading-[0.85] tracking-[-0.04em] text-foreground mb-10"
    >
      Meester <em class="text-primary">Sites.</em>
    </div>

    <div
      class="content-container flex flex-col md:flex-row justify-between gap-3 border-t border-border pt-6 meta"
    >
      <span>
        ©{{ new Date().getFullYear() }} Meester Sites — All rights reserved
      </span>

      <span class="flex gap-4">
        <NuxtLinkLocale
          to="/policies/privacy"
          class="hover:text-foreground cursor-pointer"
        >
          Privacy
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/policies/cookie"
          class="hover:text-foreground cursor-pointer"
        >
          Cookie
        </NuxtLinkLocale>
      </span>
    </div>
  </footer>
</template>
