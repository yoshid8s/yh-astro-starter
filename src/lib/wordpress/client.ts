import type { WordPressCategory, WordPressPost } from './types';

const apiUrl = import.meta.env.WORDPRESS_API_URL;

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

export function getPostsByCategory(categoryId: number) {
  return request<WordPressPost[]>(
    'posts',
    new URLSearchParams({
      categories: String(categoryId),
      _embed: 'true',
      per_page: '12',
    }),
  );
}
