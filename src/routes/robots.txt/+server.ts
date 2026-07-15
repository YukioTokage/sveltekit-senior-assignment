import type { RequestHandler } from './$types';
import { locales } from '$lib/paraglide/runtime.js';

export const GET: RequestHandler = async ({ url }) => {
	let robotsTxt = `User-agent: *\nAllow: /\n\n`;

	const privateRoutes = ['/dashboard', '/api'];

	privateRoutes.forEach((route) => {
		robotsTxt += `Disallow: ${route}/\n`;

		locales.forEach((locale) => {
			robotsTxt += `Disallow: /${locale}${route}/\n`;
		});
	});

	robotsTxt += `\nSitemap: ${url.origin}/sitemap.xml`;

	return new Response(robotsTxt.trim(), {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
