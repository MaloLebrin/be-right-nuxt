<template>
<!-- eslint-disable-next-line vue/no-multiple-template-root -->
<div
  v-for="feature in features"
  :key="feature.name"
  class="relative pl-9"
>
  <dt class="inline font-semibold text-gray-900">
    <component
      :is="feature.icon"
      class="absolute w-5 h-5 text-indigo-600 left-1 top-1"
      aria-hidden="true"
    />
    {{ feature.name }}
  </dt>
  {{ ' ' }}
  <dd class="inline">
    {{ feature.description }}
  </dd>
</div>
</template>

<script setup lang="ts">
import {
  FingerPrintIcon,
  LockClosedIcon,
  PlayCircleIcon,
  QueueListIcon,
  ServerIcon,
  Square3Stack3DIcon,
} from '@heroicons/vue/20/solid'

const features = [
  {
    name: 'Dématérialisée & sécurisée.',
    description: 'Be right est une plateforme de gestion dématérialisée de vos documents de droits à l\'image. Vous pouvez gérer vos événements et faire signer vos documents en seulement quelques clics.',
    icon: LockClosedIcon,
  },
  {
    name: 'Suivi en Temps Réel.',
    description: 'Suivez les signatures de vos documents et recevez des notifications en temps réel.',
    icon: PlayCircleIcon,
  },
  {
    name: 'Rappels automatisés',
    description: 'Recevez des rappels automatiques pour les documents qui n\'ont pas encore été signés.',
    icon: Square3Stack3DIcon,
  },
  {
    name: 'Signature électronique',
    description: 'Pour plus de sécurité, nous utilsions la signature électronique pour garantir l\'authenticité des signatures.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Listes de diffusion',
    description: 'Créez des listes de diffusion pour envoyer vos documents à plusieurs personnes en même temps.',
    icon: QueueListIcon,
  },
  {
    name: 'Stockage centralisé des documents',
    description: 'Tous vos documents sont stockés de manière sécurisée sur nos serveurs.',
    icon: ServerIcon,
  },
]
</script>
