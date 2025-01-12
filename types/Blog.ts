export interface Post {
  title: string;
  description: string;
  subtitle: string;
  shortDescription: string;
  publishedAt: string;
  author: {
    image: {
      url: string;
    }
    name: string;
  }
}
