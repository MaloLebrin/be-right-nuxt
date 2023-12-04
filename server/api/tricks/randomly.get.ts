import type { Trick } from '~~/types/Tricks'

const tricks: Trick[] = [
  {
    title: 'Listes de diffusion',
    description: 'Les listes de diffusion permettent d\'envoyer de manière ciblée des documents relatifs aux droits à l\'image. Cela simplifie la diffusion des documents, les rappels de signature',
  },
  {
    title: 'Relances',
    description: 'Vous pouvez relancer des destinataires en attente de signature. Les relances sont envoyées par email.',
  },
  {
    title: 'Télécharger tous les documents d\'un événement',
    description: 'Vous pouvez télécharger tous les documents d\'un événement en un seul clic. Cela vous permet de les archiver ou de les partager avec les parties prenantes de l\'événement.',
  },
]

export default defineEventHandler(() => {
  const randomIndex = Math.floor(Math.random() * tricks.length)

  return tricks[randomIndex]
})
