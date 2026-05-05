<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <Navigation />

    <main class="relative grow flex flex-col pt-nav">
      <slot />
    </main>

    <Footer />
  </div>
</template>
