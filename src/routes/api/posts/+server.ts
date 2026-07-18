import { json } from '@sveltejs/kit';
import postsData from '$lib/server/mocks/posts.json';
import { building } from '$app/environment';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	let page = 1;
	let limit = 6;
	let lang = 'en' as 'en' | 'de';

	if (!building) {
		page = Number(url.searchParams.get('page'));
		limit = Number(url.searchParams.get('limit'));
		lang = (url.searchParams.get('lang') || 'en') as 'en' | 'de';
	}

	const sortedPosts = [...postsData].sort((a, b) => {
		return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
	});

	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedPosts = sortedPosts.slice(start, end);

	const localizedPosts = paginatedPosts.map((post) => {
		const translation = post.translations[lang] || post.translations.en;
		return {
			id: post.id,
			slug: post.slug,
			title: translation.title,
			excerpt: translation.excerpt,
			tags: post.tags,
			author: post.author,
			publishedAt: post.publishedAt,
			readingTimeMinutes: post.readingTimeMinutes,
			coverColor: post.coverColor
		};
	});

	return json({
		posts: localizedPosts,
		hasMore: end < sortedPosts.length
	});
};
