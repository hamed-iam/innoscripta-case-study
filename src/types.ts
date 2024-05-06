export interface NewsApi {
  status: string;
  totalResults: number;
  articles: NewsApiItem[];
}

export interface NewsApiItem {
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

export interface GuardiansItem {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    thumbnail: string;
  };
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface NyTimesItem {
  slug_name: string;
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  uri: string;
  url: string;
  byline: string;
  item_type: string;
  source: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  first_published_date: string;
  material_type_facet: string;
  kicker: string;
  subheadline: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: any[];
  related_urls: any[];
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }[];
}
