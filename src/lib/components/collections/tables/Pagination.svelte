<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import type { PaginationMeta } from '$lib/server/api/items';
	import Button from '$lib/components/primitives/Button.svelte';
	import Card from '$lib/components/layout/Card.svelte';

	let { meta }: { meta: PaginationMeta } = $props();

	function changePage(newPageNumber: number) {
		const url = new URL(page.url);
		url.searchParams.set('page', newPageNumber.toString());

		goto(resolve(`${url.pathname}${url.search}` as Pathname), {
			keepFocus: true,
			noScroll: true
		});
	}
</script>

<Card class="flex items-center justify-between">
	<span class="text-sm text-muted-foreground">
		{m['common.page']()} <strong>{meta.page}</strong>
		{m['common.from']()}
		{meta.totalPages} ({m['common.total']()}: {meta.total})
	</span>
	<div class="flex gap-2">
		<Button variant="outline" disabled={meta.page <= 1} onclick={() => changePage(meta.page - 1)}>
			{m['common.prev']()}
		</Button>
		<Button
			variant="outline"
			disabled={meta.page >= meta.totalPages}
			onclick={() => changePage(meta.page + 1)}
		>
			{m['common.next']()}
		</Button>
	</div>
</Card>
