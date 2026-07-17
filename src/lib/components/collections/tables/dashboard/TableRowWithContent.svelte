<script lang="ts">
	import { formatNumber } from '$lib/utils/formatters.js';
	import Badge from '$lib/components/primitives/Badge.svelte';
	import InlineInput from '$lib/components/controls/inputs/InlineInput.svelte';
	import TableRow from '$lib/components/collections/tables/TableRow.svelte';
	import TableCell from '$lib/components/collections/tables/TableCell.svelte';
	import type { Item } from '$lib/schemas';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorState } from '$lib/schemas/dashboard';
	import * as m from '$lib/paraglide/messages.js';

	let {
		item,
		role,
		error = $bindable()
	}: {
		item: Item;
		role: string;
		error: ErrorState;
	} = $props();

	async function handleInlineEdit(item: Item, newName: string) {
		if (item.name === newName) return;
		const oldName = item.name;
		item.name = newName;

		const formData = new FormData();
		formData.append('id', item.id);
		formData.append('name', newName);

		try {
			const response = await fetch('?/update', {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type === 'failure' || result.type === 'error') {
				throw new Error(
					result.type === 'failure' && result.data?.error
						? String(result.data.error)
						: m['common.error']()
				);
			}

			if (result.type === 'success') {
				invalidateAll();
			}
		} catch (err) {
			item.name = oldName;
			error.errorMessage = err instanceof Error ? err.message : m['common.error']();
			error.fieldErrors = {};
			error.errorDialogOpen = true;
		}
	}
</script>

<TableRow>
	<TableCell class="font-medium font-mono text-xs text-muted-foreground">
		{item.id.split('-')[0]}
	</TableCell>

	<TableCell>
		{#if role === 'admin' || role === 'editor'}
			<InlineInput value={item.name} onsave={(val) => handleInlineEdit(item, val)} />
		{:else}
			<span class="px-2 py-1 text-sm block font-medium">{item.name}</span>
		{/if}
	</TableCell>

	<TableCell>
		{#if item.status === 'active' || item.status === 'completed'}
			<Badge variant="success" class="capitalize">{item.status}</Badge>
		{:else if item.status === 'paused' || item.status === 'scheduled'}
			<Badge variant="warning" class="capitalize">{item.status}</Badge>
		{:else}
			<Badge variant="secondary" class="capitalize">{item.status}</Badge>
		{/if}
	</TableCell>

	<TableCell>
		<span class="text-sm font-medium capitalize">{item.channel}</span>
	</TableCell>

	<TableCell>
		<span class="text-sm text-muted-foreground">{item.owner.name}</span>
	</TableCell>

	<TableCell class="text-right font-mono text-sm">
		${item.budget.toLocaleString('en-US')}
	</TableCell>

	<TableCell class="text-right font-mono text-sm text-muted-foreground">
		${item.spent.toLocaleString('en-US')}
	</TableCell>

	<TableCell class="text-right font-mono text-sm text-muted-foreground">
		{formatNumber(item.impressions)}
	</TableCell>

	<TableCell class="text-right font-mono text-sm text-muted-foreground">
		{formatNumber(item.clicks)}
	</TableCell>

	<TableCell class="text-right font-mono text-sm font-medium text-primary">
		{(item.ctr * 100).toFixed(2)}%
	</TableCell>

	<TableCell class="text-xs text-muted-foreground whitespace-nowrap">
		{item.startDate} — {item.endDate}
	</TableCell>

	<TableCell>
		<div class="flex flex-wrap gap-1 max-w-50">
			{#each item.tags as tag (tag)}
				<span
					class="inline-flex items-center rounded bg-muted/60 px-1.5 py-0.5 text-xs font-medium border border-border"
				>
					{tag}
				</span>
			{/each}
		</div>
	</TableCell>
</TableRow>
