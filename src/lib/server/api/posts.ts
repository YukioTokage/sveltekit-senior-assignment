import rawPosts from '$lib/server/mocks/posts.json';
import { postsFileSchema } from '$lib/schemas';

const allPosts = postsFileSchema.parse(rawPosts);

export function getPosts() {
	return [...allPosts].sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);
}

export function getPostBySlug(slug: string) {
	return allPosts.find((post) => post.slug === slug);
}
