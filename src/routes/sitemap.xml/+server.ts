import type { RequestHandler } from './$types';
import postsData from '$lib/server/mocks/posts.json';
import { locales, localizeHref } from '$lib/paraglide/runtime.js';

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;

	const staticPages = ['/', '/search', '/blog', '/login'];

	const dynamicPages = postsData.map((post) => `/blog/${post.slug}`);

	const allPages = [...staticPages, ...dynamicPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:xhtml="https://www.w3.org/1999/xhtml">
			${allPages
				.map((pagePath) => {
					return locales
						.map((locale) => {
							const localizedPath = localizeHref(pagePath, { locale });

							return `
						<url>
							<loc>${origin}${localizedPath}</loc>
							<changefreq>${pagePath === '/' ? 'daily' : 'weekly'}</changefreq>
							<priority>${pagePath === '/' ? '1.0' : '0.8'}</priority>
							
							${locales
								.map(
									(altLocale) => `
								<xhtml:link 
									rel="alternate" 
									hreflang="${altLocale}" 
									href="${origin}${localizeHref(pagePath, { locale: altLocale })}" 
								/>
							`
								)
								.join('')}
							
							<xhtml:link 
								rel="alternate" 
								hreflang="x-default" 
								href="${origin}${localizeHref(pagePath, { locale: 'en' })}" 
							/>
						</url>
					`;
						})
						.join('');
				})
				.join('')}
		</urlset>
	`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
