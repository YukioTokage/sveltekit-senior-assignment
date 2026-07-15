import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import postsData from '$lib/server/mocks/posts.json';
import { getLocale } from '$lib/paraglide/runtime.js';
import * as m from '$lib/paraglide/messages.js';
import DOMPurify from 'isomorphic-dompurify';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const currentLang = getLocale() as 'en' | 'de';

	const post = postsData.find((p) => p.slug === slug);

	if (!post) {
		throw error(404, {
			message: m['blog.notFound']()
		});
	}

	const translation = post.translations[currentLang] || post.translations.en;

	const cleanBody = DOMPurify.sanitize(translation.body);

	const localizedPost = {
		id: post.id,
		slug: post.slug,
		title: translation.title,
		excerpt: translation.excerpt,
		body: cleanBody,
		tags: post.tags,
		author: post.author,
		publishedAt: post.publishedAt,
		readingTimeMinutes: post.readingTimeMinutes,
		coverColor: post.coverColor
	};

	return {
		post: localizedPost
	};
};
