<script lang="ts">
	import type { PageData } from './$types';
	import type { LocalizedPost } from '$lib/schemas';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';

	import HeadMeta from '$lib/components/layout/HeadMeta.svelte';
	import PostCard from '$lib/components/collections/grids/PostCard.svelte';

	let { data }: { data: PageData } = $props();
	let currentLang = $derived(getLocale());

	let posts = $derived<LocalizedPost[]>(data.initialPosts);
	let page = $state(1);
	let hasMore = $derived(data.initialHasMore);
	let isLoading = $state(false);

	async function loadMore() {
		if (isLoading || !hasMore) return;

		isLoading = true;
		page += 1;

		try {
			const res = await fetch(`/api/posts?page=${page}&limit=6&lang=${currentLang}`);
			const newData = await res.json();

			posts.push(...newData.posts);
			hasMore = newData.hasMore;
		} catch (error) {
			console.error('Failed to load more posts:', error);
		} finally {
			isLoading = false;
		}
	}

	function infiniteScrollObserver(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMore();
				}
			},
			{ rootMargin: '100px' }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<HeadMeta title={m['blog.meta.title']()} description={m['blog.meta.description']()} />

<div class="container mx-auto px-4 py-12 max-w-6xl">
	<div class="mb-12">
		<h1 class="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
			{m['blog.title']()}
		</h1>
		<p class="text-lg text-muted-foreground max-w-2xl">
			{m['blog.subtitle']()}
		</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each posts as post (post.id)}
			<PostCard {post} />
		{/each}
	</div>

	{#if hasMore}
		<div use:infiniteScrollObserver class="w-full flex justify-center py-12">
			{#if isLoading}
				<div class="flex items-center gap-2 text-muted-foreground">
					<svg
						class="animate-spin h-5 w-5 text-primary"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						><circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle><path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path></svg
					>
					<span>{m['common.loading']()}</span>
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center py-12 text-muted-foreground text-sm">
			{m['blog.no_more']()}
		</div>
	{/if}
</div>
