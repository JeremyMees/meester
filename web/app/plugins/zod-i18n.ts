import { z } from 'zod'
import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin(async nuxtApp => {
  const { locale } = nuxtApp.$i18n as Composer

  const loadLocale = async (lang: string) => {
    try {
      const { default: localeConfig } = await import(
        /* @vite-ignore */
        `zod/v4/locales/${lang}.js`
      )
      z.config(localeConfig())
    } catch {
      const { default: en } = await import('zod/v4/locales/en.js')
      z.config(en())
    }
  }

  await loadLocale(locale.value)
  watch(locale, loadLocale)
})
