export interface Post {
  mainImage: {
    url: string;
    alt: string;
  }
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  content: string;
  author: {
    image: {
      url: string;
    }
    name: string;
  }
}
