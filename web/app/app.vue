<template>
  <NuxtRouteAnnouncer />

  <ClientOnly>
    <ConsentBanner />
  </ClientOnly>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
