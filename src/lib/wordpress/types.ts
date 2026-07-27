export type WordPressRendered = {
  rendered: string;
};

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

export type WordPressTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type WordPressPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  categories: number[];
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressTerm[][];
  };
};
