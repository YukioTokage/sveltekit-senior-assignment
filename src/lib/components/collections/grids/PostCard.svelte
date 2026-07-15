<script lang="ts">
	import { formatDate } from '$lib/utils/formatters';
	import type { LocalizedPost } from '$lib/schemas';
	import { localizedResolve } from '$lib/utils/route.js';

	let { post }: { post: LocalizedPost } = $props();
</script>

<article
	class="flex flex-col items-start justify-between rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
	style="border-top: 4px solid {post.coverColor}"
>
	<div class="w-full">
		<div class="flex flex-wrap gap-2 mb-4">
			<!-- TODO: Use Badge.svelte -->
			{#each post.tags as tag (tag)}
				<span
					class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
				>
					{tag}
				</span>
			{/each}
		</div>

		<h3 class="text-xl font-bold tracking-tight text-foreground mb-2">
			<a
				href={localizedResolve(`/blog/${post.slug}`)}
				class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
			>
				{post.title}
			</a>
		</h3>

		<p class="text-sm text-muted-foreground line-clamp-3 mb-6">
			{post.excerpt}
		</p>
	</div>

	<div class="flex items-center justify-between w-full border-t pt-4 mt-auto">
		<div class="flex items-center gap-x-4 text-xs text-muted-foreground">
			<time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
			<span class="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-clock"
					><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
				>
				{post.readingTimeMinutes} min
			</span>
		</div>

		<div class="flex items-center gap-2">
			<span class="text-xs font-medium text-foreground">{post.author.name}</span>
			<div class="w-6 h-6 rounded-full" style="background-color: {post.author.avatarColor};"></div>
		</div>
	</div>
</article>
