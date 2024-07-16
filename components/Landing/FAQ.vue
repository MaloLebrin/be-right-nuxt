<template>
<section class="bg-white">
  <div class="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 lg:py-40">
    <div class="max-w-4xl mx-auto divide-y divide-gray-900/10">
      <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Questions fréquemment posées
      </h2>
      <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
        <Disclosure
          v-for="faq in faqs"
          :key="faq.question"
          v-slot="{ open }"
          as="div"
          class="pt-6"
        >
          <dt>
            <DisclosureButton class="flex items-start justify-between w-full text-left text-gray-900">
              <span class="text-base font-semibold leading-7">{{ faq.question }}</span>
              <span class="flex items-center ml-6 h-7">
                <PlusIcon
                  v-if="!open"
                  class="w-6 h-6"
                  aria-hidden="true"
                />
                <MinusIcon
                  v-else
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel
            as="dd"
            class="pr-12 mt-2"
          >
            <p class="text-base leading-7 text-gray-600">
              {{ faq.answer }}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </dl>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const faqs = [
  {
    question: 'Qu\'est-ce que BeRight',
    answer:
      'BeRight est une solution de gestion des droits à l\'image pour les entreprises françaises, automatisant le processus d\'obtention et de gestion des autorisations d\'utilisation d\'image des employés lors d\'événements d\'entreprise.',
  },
  {
    question: 'Comment puis-je obtenir les documents signés ?',
    answer:
      'Vous pouvez télécharger les documents signés individuellement ou en lot directement depuis votre tableau de bord BeRight.',
  },
  {
    question: 'Y a-t-il une limite au nombre de destinataires ou d\'événements que je peux gérer ?',
    answer:
      'Nos forfaits sont adaptés à différentes tailles d\'entreprises. Le forfait Entreprise offre des capacités illimitées.',
  },
  {
    question: 'Comment puis-je suivre qui a signé et qui ne l\'a pas encore fait ?',
    answer:
      'Vous disposez d\'un tableau de bord en temps réel montrant le statut de chaque signature, avec des options pour envoyer des rappels automatiques.',
  },
  {
    question: 'Les destinataires doivent-ils créer un compte pour signer ?',
    answer:
      'Non, les destinataires reçoivent un lien unique par email leur permettant de signer sans avoir à créer de compte.',
  },
  {
    question: 'Que se passe-t-il si un employé refuse de donner son autorisation ?',
    answer:
      'BeRight enregistre toutes les réponses, y compris les refus. Vous pouvez facilement identifier ces cas et prendre les mesures appropriées.',
  },
]
</script>
