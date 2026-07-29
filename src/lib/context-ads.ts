import { wordpressSiteUrl } from './wordpress/client';

export type ContextAdPlacement = 'top' | 'middle' | 'bottom';

export interface ContextAd {
  id: string;
  elementId: string;
  advertiser: string;
  headline: string;
  image: string;
  destination: string;
  clickUrl: string;
  genre: string;
}

interface ContextAdResponse {
  ad: ContextAd | null;
}

export const contextAdEventUrl = new URL(
  '/wp-json/ca-manager/v1/context-ad/event',
  wordpressSiteUrl || 'http://localhost',
).toString();

export async function getContextAd(
  postId: number,
  placement: ContextAdPlacement,
): Promise<ContextAd | null> {
  const endpoint = new URL(
    '/wp-json/ca-manager/v1/context-ad',
    wordpressSiteUrl,
  );

  endpoint.searchParams.set('post_id', String(postId));
  endpoint.searchParams.set('placement', placement);

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      return null;
    }

    return ((await response.json()) as ContextAdResponse).ad;
  } catch {
    return null;
  }
}