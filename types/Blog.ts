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
}
