import { z } from 'zod'
import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin(nuxtApp => {
  const { t } = nuxtApp.$i18n as Composer

  z.config({
    customError: issue => {
      switch (issue.code) {
        case 'too_small':
          if (issue.origin === 'string') {
            return t('validation.minLength', { min: Number(issue.minimum) })
          }
          if (issue.origin === 'array') {
            return t('validation.minItems', { min: Number(issue.minimum) })
          }
          break

        case 'too_big':
          if (issue.origin === 'string') {
            return t('validation.maxLength', { max: Number(issue.maximum) })
          }
          if (issue.origin === 'array') {
            return t('validation.maxItems', { max: Number(issue.maximum) })
          }
          break

        case 'invalid_format':
          if (issue.format === 'email') {
            return t('validation.invalidEmail')
          }
          break

        case 'invalid_value':
          return t('validation.invalidOption')

        case 'invalid_type':
          return t('validation.required')
      }
    },
  })
})
