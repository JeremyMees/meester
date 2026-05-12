<script setup lang="ts">
import type { ContactForm } from '#shared/types/sanity'
import type { BlockMeta } from '~/types/blocks'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

defineProps<ContactForm & BlockMeta>()

const formSchema = toTypedSchema(contactFormSchema)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    type: 'new project',
  },
})

const sentTo = ref<string>()

const onSubmit = handleSubmit(async values => {
  try {
    await $fetch('/api/form/contact', {
      method: 'POST',
      body: values,
    })

    sentTo.value = values.name
    resetForm()
  } catch (error) {
    console.error('Form submission failed:', error)
  }
})
</script>

<template>
  <section
    class="content-container py-24 md:py-32 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24"
  >
    <div v-if="sentTo" class="max-w-prose flex flex-col gap-4">
      <h3>{{ $t('contactForm.success.title', { name: sentTo }) }}</h3>
      <p class="text-muted-foreground">
        {{ $t('contactForm.success.message') }}
      </p>
      <Button variant="outline" class="w-fit group" @click="sentTo = ''">
        <Icon
          name="tabler:arrow-left"
          class="group-hover:rotate-45 transition-transform"
        />
        {{ $t('contactForm.success.anotherMessage') }}
      </Button>
    </div>

    <form v-else id="contact" class="flex flex-col gap-8" @submit="onSubmit">
      <VeeField v-slot="{ field, errors }" name="type">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--type">
            {{ $t('contactForm.type.label') }}
          </FieldLabel>
          <ButtonInputGroup
            id="contact--type"
            :options="[
              {
                value: 'new project',
                label: $t('contactForm.type.newProject'),
              },
              {
                value: 'maintenance / seo',
                label: $t('contactForm.type.maintenance'),
              },
              {
                value: 'collaboration',
                label: $t('contactForm.type.collaboration'),
              },
              { value: 'just say hi', label: $t('contactForm.type.justSayHi') },
            ]"
            :model-value="field.value"
            :aria-invalid="!!errors.length"
            @update:model-value="field.onChange"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <div class="grid sm:grid-cols-2 gap-4">
        <VeeField v-slot="{ field, errors }" name="name">
          <Field :data-invalid="!!errors.length">
            <FieldLabel for="contact--name" required>
              {{ $t('contactForm.name') }}
            </FieldLabel>
            <Input
              id="contact--name"
              v-bind="field"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="company">
          <Field :data-invalid="!!errors.length">
            <FieldLabel for="contact--company">
              {{ $t('contactForm.company') }}
            </FieldLabel>
            <Input
              id="contact--company"
              v-bind="field"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>

      <VeeField v-slot="{ field, errors }" name="email">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--email" required>
            {{ $t('contactForm.email') }}
          </FieldLabel>
          <Input
            id="contact--email"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="category">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--category" required>
            {{ $t('contactForm.category.label') }}
          </FieldLabel>
          <ButtonInputGroup
            id="contact--category"
            multiple
            :options="[
              {
                value: 'web development',
                label: $t('contactForm.category.webDevelopment'),
              },
              {
                value: 'web design',
                label: $t('contactForm.category.webDesign'),
              },
              {
                value: 'seo & performance',
                label: $t('contactForm.category.seo'),
              },
              {
                value: 'maintenance',
                label: $t('contactForm.category.maintenance'),
              },
            ]"
            :model-value="field.value"
            :aria-invalid="!!errors.length"
            @update:model-value="field.onChange"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="timeline">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--timeline" required>
            {{ $t('contactForm.timeline.label') }}
          </FieldLabel>
          <RadioGroup
            id="contact--timeline"
            :model-value="field.value"
            @update:model-value="field.onChange"
          >
            <FieldLabel
              v-for="option in [
                'asap',
                '1-3 months',
                '3-6 months',
                'just exploring',
              ]"
              :key="option"
              :for="`timeline-${option}`"
            >
              <Field orientation="horizontal" :data-invalid="!!errors.length">
                <FieldContent>
                  <FieldTitle>{{
                    $t(`contactForm.timeline.${option}`)
                  }}</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  :id="`timeline-${option}`"
                  :value="option"
                  :aria-invalid="!!errors.length"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="description">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--description" required>
            {{ $t('contactForm.tellMeMore') }}
          </FieldLabel>
          <Textarea
            id="contact--description"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="referral">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="contact--referral">
            {{ $t('contactForm.referral') }}
          </FieldLabel>
          <Input
            id="contact--referral"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <div class="grid sm:grid-cols-2 gap-4">
        <p class="text-xs text-muted-foreground">
          {{ terms ?? '' }}
        </p>
        <Button class="group">
          {{ submit ?? '' }}
          <Icon
            name="tabler:arrow-right"
            class="group-hover:-rotate-45 transition-transform"
          />
        </Button>
      </div>
    </form>

    <aside
      class="flex flex-wrap lg:flex-nowrap lg:flex-col gap-12 lg:sticky lg:top-24 lg:self-start"
    >
      <div v-if="email" class="flex flex-col gap-3">
        <span
          class="font-mono text-primary text-xs uppercase tracking-[0.15em]"
        >
          {{ email.preTitle }}
        </span>
        <NuxtLink
          :to="`mailto:${email.email}`"
          class="h3 border-b-[1.5px] w-fit border-foreground"
        >
          {{ email.email }}
        </NuxtLink>
        <span class="font-mono text-xs uppercase tracking-[0.15em]">
          {{ email.subtitle }}
        </span>
      </div>

      <div v-if="location" class="flex flex-col gap-3">
        <span class="font-mono text-xs uppercase tracking-[0.15em]">
          {{ location.preTitle }}
        </span>
        <span
          class="font-serif text-[22px] leading-normal text-foreground max-w-50"
        >
          {{ location.location }}
        </span>
        <span class="font-mono text-xs uppercase tracking-[0.15em]">
          {{ location.subtitle }}
        </span>
      </div>
    </aside>
  </section>
</template>
