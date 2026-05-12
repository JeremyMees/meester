<script setup lang="ts">
const {
  showPopup,
  consents,
  consentTypes,
  toggleConsent,
  acceptAll,
  rejectAll,
  savePreferences,
} = useConsent()

const showSettings = ref(false)
</script>

<template>
  <div
    v-if="showPopup"
    tabindex="0"
    :aria-label="$t('consentBanner.banner.title')"
    aria-modal="true"
    role="dialog"
    :data-state="showPopup ? 'open' : 'closed'"
    data-test-banner
    class="fixed border bg-background shadow-lg z-50 md:w-md overflow-hidden right-4 left-4 bottom-4 p-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
  >
    <div v-if="!showSettings" data-test-banner-info class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <p class="font-bold">
          {{ $t('consentBanner.banner.title') }}
        </p>
        <p class="text-muted-foreground text-sm">
          {{ $t('consentBanner.banner.text') }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row justify-between gap-2">
        <div class="flex flex-col md:flex-row gap-2">
          <Button
            data-test-reject-all
            variant="secondary"
            size="sm"
            class="w-full md:w-fit"
            @click="rejectAll"
          >
            {{ $t('consentBanner.rejectAll') }}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            class="w-full md:w-fit"
            @click="acceptAll"
          >
            {{ $t('consentBanner.acceptAll') }}
          </Button>
        </div>
        <Button variant="default" size="sm" @click="showSettings = true">
          {{ $t('consentBanner.customize') }}
        </Button>
      </div>
    </div>

    <div v-else data-test-banner-settings class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <p class="font-bold">
          {{ $t('consentBanner.settings.title') }}
        </p>
        <p class="text-muted-foreground text-sm">
          {{ $t('consentBanner.settings.text') }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="{ name } in consentTypes"
          :key="name"
          class="border rounded-lg p-4 flex flex-col gap-2"
        >
          <div class="flex items-center justify-between">
            <Label :for="name">
              {{ $t(`consentBanner.${name}`) }}
            </Label>
            <Switch
              :id="name"
              :checked="consents?.[name] || false"
              :default-value="consents?.[name] || false"
              :disabled="name === 'necessary'"
              @update:model-value="() => toggleConsent(name)"
            />
          </div>
          <p class="text-xs text-muted-foreground">
            {{ $t(`consentBanner.${name}Text`) }}
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between gap-2">
        <div class="flex flex-row gap-2">
          <Button
            class="w-full md:w-fit"
            variant="secondary"
            size="sm"
            @click="rejectAll"
          >
            {{ $t('consentBanner.rejectAll') }}
          </Button>
          <Button
            class="w-full md:w-fit"
            variant="secondary"
            size="sm"
            @click="acceptAll"
          >
            {{ $t('consentBanner.acceptAll') }}
          </Button>
        </div>
        <Button variant="default" size="sm" @click="savePreferences">
          {{ $t('consentBanner.saveSettings') }}
        </Button>
      </div>
    </div>
  </div>
</template>
