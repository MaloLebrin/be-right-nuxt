export interface Post {
  title: string;
  description: string;
  subtitle: string;
  shortDescription: string;
  publishedAt: string;
  slug: string;
  author: {
    image: {
      url: string;
    }
    name: string;
  }
  imageUrl?: string;
  categories: CategorySlug[];
}

export interface Category {
  title: string;
  slug: CategorySlug;
  description?: string;
}

export type CategorySlug = 'droits-image-juridique' |
  'transformation-digitale-droits-image' |
  'transformation-digitale' | 
  'securite-conformite-droits-image' |
  'securite-conformite' |
  'droits-image' |
  'droits-image-juridique' |
  'droits-image-photographie' |
  'droits-image-video' |
  'droits-image-musique' |
  'automatisation-droits-image' |
  'automatisation' |
  'signature-electronique-droits-image' |
  'signature-electronique'
