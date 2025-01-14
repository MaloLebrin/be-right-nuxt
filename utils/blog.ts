import type { Category, CategorySlug } from "~/types/Blog";

export const CategoryMap = new Map<CategorySlug, Category>([
  ['transformation-digitale-droits-image', {
    title: 'Innovation Technologique',
    slug: 'transformation-digitale-droits-image',
    description: "Analyse des technologies émergentes qui révolutionnent la gestion, la protection et la monétisation des droits à l'image."
  }],

  ['droits-image-juridique', {
    title: "Enjeux Juridiques et Stratégiques",
    slug: 'droits-image-juridique',
    description: "Exploration approfondie des aspects légaux, réglementaires et stratégiques liés à la gestion des droits à l'image dans un environnement numérique complexe."
  }],

  ["securite-conformite-droits-image", {
    title: "Sécurisation et Conformité",
    slug: "securite-conformite-droits-image",
    description: "Stratégies et outils pour protéger les contenus visuels, garantir leur authenticité et prévenir les utilisations non autorisées."
  }],

  ['automatisation-droits-image', {
    title: "Gestion des Droits à l'image",
    slug: 'automatisation-droits-image',
    description: "Méthodes et solutions pour rationaliser, automatiser et simplifier la gestion administrative des droits à l'image."
  }],

  ['signature-electronique', {
    title: "Signature Électronique",
    slug: 'signature-electronique',
    description: "Exploration des technologies de signature électronique et leur impact sur la gestion légale et sécurisée des droits à l'image."
  }],
])

export function getArticleCategories(categories: CategorySlug[]): Category[] {
  if (!categories || categories?.length === 0) return [];
  return categories.map(slug => CategoryMap.get(slug)!);
}
