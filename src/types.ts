export type NewsParam = {
  q?: string;
  from?: string;
  to?: string;
  category?: string;
  jq?: string;
  tag?: string;
  sources?: string;
};

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

export interface NyArticleSearch {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  print_section?: string;
  print_page?: string;
}

interface Byline {
  original: string;
  person: Person[];
  organization: null;
}

interface Person {
  firstname: string;
  middlename: null | string;
  lastname: string;
  qualifier: null;
  title: null;
  role: string;
  organization: string;
  rank: number;
}

interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

interface Headline {
  main: string;
  kicker: null | string;
  content_kicker: null;
  print_headline: null | string;
  name: null;
  seo: null;
  sub: null;
}

interface Multimedia {
  rank: number;
  subtype: string;
  caption: null;
  credit: null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}

interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}
