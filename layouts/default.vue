<template>
<div class="flex flex-col min-h-screen">
  <LayoutsHeader />
  <div class="flex justify-center flex-1 w-full h-full">
    <main class="flex-1">
      <slot />
    </main>
  </div>
  <LayoutsFooter />
</div>
</template>
