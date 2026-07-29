import type { WordPressCategory, WordPressMedia, WordPressPost, WordPressTerm } from './types';

export type { WordPressPost } from './types';

const apiUrl = import.meta.env.WORDPRESS_API_URL;
const embeddedFields = 'wp:featuredmedia,wp:term';

export const wordpressSiteUrl = apiUrl ? new URL(apiUrl).origin : '';

function endpoint(path: string, params = new URLSearchParams()) {
  if (!apiUrl) {
    throw new Error('WORDPRESS_API_URL を .env に設定してください。');
  }

  const url = new URL(`${apiUrl.replace(/\/$/, '')}/${path}`);
  url.search = params.toString();
  return url;
}

async function request<T>(path: string, params?: URLSearchParams): Promise<T> {
  const response = await fetch(endpoint(path, params), {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`WordPress REST API の取得に失敗しました: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getCategories() {
  return request<WordPressCategory[]>(
    'categories',
    new URLSearchParams({ hide_empty: 'true', per_page: '100' }),
  );
}

export function getPosts(perPage = 10, page = 1) {
  return request<WordPressPost[]>(
    'posts',
    new URLSearchParams({
      page: String(page),
      status: 'publish',
      _embed: embeddedFields,
      per_page: String(perPage),
    }),
  );
}

export function getPostsByCategory(categoryId: number) {
  return request<WordPressPost[]>(
    'posts',
    new URLSearchParams({
      categories: String(categoryId),
      status: 'publish',
      _embed: embeddedFields,
      per_page: '12',
    }),
  );
}

export async function getAllPosts() {
  const posts: WordPressPost[] = [];
  let page = 1;

  while (true) {
    const url = endpoint(
      'posts',
      new URLSearchParams({
        page: String(page),
        status: 'publish',
        _embed: embeddedFields,
        per_page: '100',
      }),
    );
    const response = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!response.ok) {
      throw new Error(`WordPress 記事の取得に失敗しました: ${response.status}`);
    }

    posts.push(...((await response.json()) as WordPressPost[]));
    const totalPages = Number(response.headers.get('X-WP-TotalPages') ?? '1');

    if (page >= totalPages) return posts;
    page += 1;
  }
}

export function getFeaturedImage(post: WordPressPost): WordPressMedia | undefined {
  return post._embedded?.['wp:featuredmedia']?.[0];
}

export function getPostCategories(post: WordPressPost): WordPressTerm[] {
  return post._embedded?.['wp:term']?.find((terms) =>
    terms.some((term) => term.taxonomy === 'category'),
  ) ?? [];
}

export function decodeWordPressSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
