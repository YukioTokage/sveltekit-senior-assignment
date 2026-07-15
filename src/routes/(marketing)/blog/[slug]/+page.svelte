<script lang="ts">
	import type { PageData } from './$types';
	import type { Action } from 'svelte/action';
	import HeadMeta from '$lib/components/layout/HeadMeta.svelte';
	import { formatDate, formatNumber } from '$lib/utils/formatters';
	import * as m from '$lib/paraglide/messages.js';
	import { localizedResolve } from '$lib/utils/route.js';
	import { disableSelfLink } from '$lib/directive/disableSelfLink.svelte.js';

	let { data }: { data: PageData } = $props();

	let post = $derived(data.post);

	const renderHtml: Action<HTMLElement, string> = (node, content) => {
		node.innerHTML = content;

		return {
			update(newContent) {
				node.innerHTML = newContent;
			}
		};
	};
</script>

<HeadMeta
	title={post.title}
	description={post.excerpt}
	ogType="article"
	image={`/og/${post.slug}`}
/>

<article class="min-h-screen pb-20">
	<div
		class="w-full h-64 md:h-96 relative flex items-end"
		style="background: linear-gradient(to top, var(--color-background), transparent), {post.coverColor}15"
	>
		<div class="container mx-auto px-4 max-w-4xl pb-8 relative z-10">
			<div class="flex flex-wrap gap-2 mb-4">
				{#each post.tags as tag (tag)}
					<span
						class="inline-flex items-center rounded-md bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
					>
						{tag}
					</span>
				{/each}
			</div>

			<h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
				{post.title}
			</h1>
		</div>
	</div>

	<div class="container mx-auto px-4 max-w-4xl mt-8">
		<div
			class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b text-sm text-muted-foreground mb-10"
		>
			<div class="flex items-center gap-3">
				<div
					class="w-10 h-10 rounded-full border shadow-sm"
					style="background-color: {post.author.avatarColor}"
				></div>
				<div>
					<p class="font-semibold text-foreground leading-tight">{post.author.name}</p>
					<p class="text-xs text-muted-foreground mt-0.5">
						{m['blog.author.role']()}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-4 text-xs">
				<time datetime={post.publishedAt} class="flex items-center gap-1">
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
						><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line
							x1="16"
							x2="16"
							y1="2"
							y2="6"
						/><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg
					>
					{formatDate(post.publishedAt)}
				</time>
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
						><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
					>
					{formatNumber(post.readingTimeMinutes)} min read
				</span>
			</div>
		</div>

		<div
			class="prose dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6"
			use:renderHtml={post.body}
		></div>

		<div class="mt-16 pt-6 border-t">
			<a
				href={localizedResolve('/blog')}
				use:disableSelfLink
				class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
			>
				<svg
					class="transition-transform group-hover:-translate-x-1"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="19" x2="5" y1="12" y2="12" /><polyline points="12 19 5 12 12 5" /></svg
				>
				{m['blog.backToPublications']()}
			</a>
		</div>
	</div>
</article>
