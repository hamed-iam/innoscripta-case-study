export interface NewsItem {
  source: {
    id: number | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsApi {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}
