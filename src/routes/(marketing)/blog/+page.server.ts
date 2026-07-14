import type { PageServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime.js';

export const load: PageServerLoad = async ({ fetch }) => {
	const currentLang = getLocale();
	const limit = 6;

	const res = await fetch(`/api/posts?page=1&limit=${limit}&lang=${currentLang}`);
	const data = await res.json();

	return {
		initialPosts: data.posts,
		initialHasMore: data.hasMore
	};
};
