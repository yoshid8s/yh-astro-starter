export type PageSeo = {
  title: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
};

const siteName = import.meta.env.PUBLIC_SITE_NAME ?? 'Y&H Astro Starter';
const defaultDescription =
  import.meta.env.PUBLIC_SITE_DESCRIPTION ??
  'WordPress Headless CMS + Astro starter';

export function createSeo(input: PageSeo) {
  return {
    title: input.title === siteName ? siteName : `${input.title} | ${siteName}`,
    description: input.description ?? defaultDescription,
    canonical: input.canonical,
    noindex: input.noindex ?? false,
  };
}
