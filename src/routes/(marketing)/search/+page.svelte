<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { localizedResolve } from '$lib/utils/route.js';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	import HeadMeta from '$lib/components/layout/HeadMeta.svelte';
	import PostCard from '$lib/components/collections/grids/PostCard.svelte';
	import CustomInput from '$lib/components/controls/inputs/CustomInput.svelte';
	import Select from '$lib/components/controls/inputs/Select.svelte';
	import Checkbox from '$lib/components/controls/inputs/Checkbox.svelte';

	let { data }: { data: PageData } = $props();
	let currentLang = $derived(getLocale());

	let formElement: HTMLFormElement | undefined = $state();
	let debounceTimer: ReturnType<typeof setTimeout>;

	/**
	 * @param debounce - Need to make timeout before sync
	 */
	function syncFilters(debounce = false) {
		if (!formElement) return;

		clearTimeout(debounceTimer);

		const executeQuery = () => {
			const formData = new FormData(formElement);
			const params = new SvelteURLSearchParams();

			const q = formData.get('q') as string;
			const tag = formData.get('tag') as string;
			const sort = formData.get('sort') as string;
			const long = formData.get('long');

			if (q) params.set('q', q);
			if (tag) params.set('tag', tag);
			if (sort && sort !== 'desc') params.set('sort', sort);
			if (long) params.set('long', 'true');

			goto(resolve(`/search?${params.toString()}`), {
				keepFocus: true,
				noScroll: true,
				replaceState: true
			});
		};

		if (debounce) {
			debounceTimer = setTimeout(executeQuery, 300);
		} else {
			executeQuery();
		}
	}
</script>

<HeadMeta title={m['search.meta.title']()} description={m['search.meta.description']()} />

<div class="container mx-auto px-4 py-12 max-w-6xl">
	<h1 class="text-3xl font-extrabold tracking-tight text-foreground mb-8">
		{m['search.title']()}
	</h1>

	<form
		bind:this={formElement}
		onsubmit={(e) => e.preventDefault()}
		class="grid gap-6 border p-6 rounded-xl bg-muted/30 mb-8"
	>
		<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-4 items-end">
			<div class="md:col-span-2 flex flex-col gap-2">
				<label for="search-q" class="text-sm font-medium text-foreground">
					{m['search.input.label']()}
				</label>
				<CustomInput
					id="search-q"
					type="search"
					name="q"
					value={data.searchParams.query}
					placeholder={m['search.placeholder']()}
					oninput={() => syncFilters(true)}
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="search-tag" class="text-sm font-medium text-foreground">
					{m['search.tag.label'] ? m['search.tag.label']() : 'Category'}
				</label>
				<Select
					id="search-tag"
					name="tag"
					value={data.searchParams.activeTag}
					onchange={() => syncFilters(false)}
				>
					<option value="">{m['search.all_tags'] ? m['search.all_tags']() : 'All Tags'}</option>
					{#each data.tags as tag (tag.slug)}
						<option value={tag.slug}>
							{typeof tag.label === 'object'
								? tag.label[currentLang] || tag.label['en']
								: tag.label}
						</option>
					{/each}
				</Select>
			</div>

			<div class="flex flex-col gap-2">
				<label for="search-sort" class="text-sm font-medium text-foreground">
					{m['search.sort.label']()}
				</label>
				<Select
					id="search-sort"
					name="sort"
					value={data.searchParams.sort}
					onchange={() => syncFilters(false)}
				>
					<option value="desc">{m['search.sort.newest']()}</option>
					<option value="asc">{m['search.sort.oldest']()}</option>
				</Select>
			</div>
		</div>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4">
			<div>
				<label
					for="only-long"
					class="flex items-center gap-3 cursor-pointer text-sm font-medium text-foreground select-none"
				>
					<Checkbox
						id="only-long"
						name="long"
						checked={data.searchParams.onlyLongReads}
						onchange={() => syncFilters(false)}
					/>
					<span>
						{m['search.filter.long_reads']()}
					</span>
				</label>
			</div>

			<div class="flex gap-3 justify-end">
				{#if data.searchParams.query || data.searchParams.activeTag || data.searchParams.onlyLongReads || data.searchParams.sort !== 'desc'}
					<a
						href={localizedResolve('/search')}
						class="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
					>
						{m['search.clear']()}
					</a>
				{/if}
			</div>
		</div>
	</form>

	<div class="text-sm text-muted-foreground mb-6" aria-live="polite">
		{m['search.results']({ count: data.posts.length, query: data.searchParams.query || '*' })}
	</div>

	{#if data.posts.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-16 border rounded-xl border-dashed bg-muted/10">
			<p class="text-muted-foreground">
				{m['search.noResults']()}
			</p>
		</div>
	{/if}
</div>
