<template>
<div class="min-h-screen">
  <LayoutsHeader />
  <div class="flex justify-center w-full h-full">
    <main class="container flex-1">
      <slot />
    </main>
  </div>
  <LayoutsFooter />
</div>
</template>
