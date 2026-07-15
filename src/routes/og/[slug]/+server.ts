import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postsData from '$lib/server/mocks/posts.json';

export const GET: RequestHandler = async ({ params }) => {
	const post = postsData.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Not found');
	}

	const title = post.translations.en?.title || 'Article';
	const author = post.author.name;
	const color = post.coverColor || '#3b82f6';

	const svg = `
		<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
			<rect width="1200" height="630" fill="#0f172a" />
			<rect width="1200" height="16" fill="${color}" />
			
			<g transform="translate(80, 120)">
				<rect width="140" height="40" rx="8" fill="${color}" opacity="0.2" />
				<text x="70" y="26" fill="${color}" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">
					${post.tags[0] || 'BLOG'}
				</text>

				<text x="0" y="140" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="72" font-weight="900" width="1000">
					<tspan x="0" dy="0">${title.substring(0, 35)}</tspan>
					<tspan x="0" dy="90">${title.length > 35 ? title.substring(35, 70) + '...' : ''}</tspan>
				</text>

				<circle cx="24" cy="380" r="24" fill="${post.author.avatarColor}" />
				<text x="64" y="388" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="32" font-weight="500">
					${author}
				</text>
			</g>
		</svg>
	`;

	return new Response(svg.trim(), {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
