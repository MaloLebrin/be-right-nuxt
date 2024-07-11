<template>
<div>
  <LandingHeroSection />
  <LandingSolutionSection />
  <LandingCta />
</div>
</template>

<script setup lang="ts">
import LandingHeroSection from '~/components/Landing/HeroSection.vue'
import LandingSolutionSection from '~/components/Landing/SolutionSection.vue'
import LandingCta from '~/components/Landing/Cta.vue'

useServerSeoMeta({
  title: 'BeRight Accueil',
  description: 'Gérez enfin le droit à l\'image de vos clients facilement !',
  ogTitle: 'BeRight Accueil',
  ogDescription: 'Gérez enfin le droit à l\'image de vos clients facilement !',
  ogUrl: 'https://be-right.co/',
  ogLocale: 'fr_FR',
  ogType: 'website',
})

useHead({
  title: 'Accueil',
  meta: [
    { name: 'description', content: 'Gérez enfin le droit à l\'image de vos clients facilement !' },
    { property: 'og:title', content: 'L\'outile de gestion de droit à \'image' },
    { property: 'og:description', content: 'Gérez enfin le droit à l\'image de vos clients facilement !' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://be-right.co/' },
    { property: 'og:locale', content: 'fr_FR' },
  ],
})
</script>
