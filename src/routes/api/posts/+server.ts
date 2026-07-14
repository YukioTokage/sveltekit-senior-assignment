import { json } from '@sveltejs/kit';
import postsData from '$lib/server/mocks/posts.json';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 6;
	const lang = (url.searchParams.get('lang') || 'en') as 'en' | 'de';

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
