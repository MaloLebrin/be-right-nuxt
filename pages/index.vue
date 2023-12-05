<template>
<div>
  <LandingHeroSection />
  <LandingSolutionSection />
  <LandingHowItWorksSection />
  <LandingPricingSection />
  <LandingNewsletterSection />
</div>
</template>

<script setup lang="ts">
import LandingHeroSection from '~~/components/Landing/HeroSection.vue'
import LandingSolutionSection from '~~/components/Landing/SolutionSection.vue'
import LandingHowItWorksSection from '~~/components/Landing/HowItWorksSection.vue'
import LandingPricingSection from '~~/components/Landing/PricingSection.vue'
import LandingNewsletterSection from '~~/components/Landing/NewsletterSection.vue'

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
