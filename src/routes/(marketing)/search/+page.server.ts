import type { PageServerLoad } from './$types';
import postsData from '$lib/server/mocks/posts.json';
import tagsData from '$lib/server/mocks/tags.json';
import { getLocale } from '$lib/paraglide/runtime.js';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q')?.toLowerCase() || '';
	const activeTag = url.searchParams.get('tag') || '';
	const sort = url.searchParams.get('sort') || 'desc';
	const onlyLongReads = url.searchParams.get('long') === 'true';

	const currentLang = getLocale() as 'en' | 'de';

	const filteredPosts = postsData.filter((post) => {
		const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
		const matchesLong = onlyLongReads ? post.readingTimeMinutes > 5 : true;

		const enText = `${post.translations.en?.title} ${post.translations.en?.body}`.toLowerCase();
		const deText = `${post.translations.de?.title} ${post.translations.de?.body}`.toLowerCase();
		const matchesQuery = query ? enText.includes(query) || deText.includes(query) : true;

		return matchesTag && matchesLong && matchesQuery;
	});

	filteredPosts.sort((a, b) => {
		const dateA = new Date(a.publishedAt).getTime();
		const dateB = new Date(b.publishedAt).getTime();
		return sort === 'asc' ? dateA - dateB : dateB - dateA;
	});

	const localizedPosts = filteredPosts.map((post) => {
		const translation = post.translations[currentLang] || post.translations.en;
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

	return {
		posts: localizedPosts,
		tags: tagsData,
		searchParams: { query, activeTag, sort, onlyLongReads }
	};
};
