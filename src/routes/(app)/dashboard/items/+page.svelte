<script lang="ts">
	import type { PageData } from './$types';
	import type { ErrorState } from '$lib/schemas/dashboard';
	import * as m from '$lib/paraglide/messages.js';

	import Table from '$lib/components/collections/tables/Table.svelte';
	import TableBody from '$lib/components/collections/tables/TableBody.svelte';
	import TableRow from '$lib/components/collections/tables/TableRow.svelte';
	import TableCell from '$lib/components/collections/tables/TableCell.svelte';
	import Pagination from '$lib/components/collections/tables/Pagination.svelte';
	import PaginationSkeleton from '$lib/components/collections/tables/PaginationSkeleton.svelte';
	import TableRowSkeleton from '$lib/components/collections/tables/dashboard/TableRowSkeleton.svelte';
	import TableHeaderWithContent from '$lib/components/collections/tables/dashboard/TableHeaderWithContent.svelte';
	import TableRowWithContent from '$lib/components/collections/tables/dashboard/TableRowWithContent.svelte';

	import Button from '$lib/components/primitives/Button.svelte';
	import CreateDashboardItemDialog from '$lib/components/modals/CreateDashboardItemDialog.svelte';
	import ErrorDialog from '$lib/components/modals/ErrorDialog.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	let { data }: { data: PageData } = $props();

	const role = $derived(data.session?.user?.role || 'viewer');

	let error = $state<ErrorState>({
		errorDialogOpen: false,
		errorMessage: '',
		fieldErrors: {},
		isCreateDialogOpen: false
	});
</script>

<div class="space-y-6">
	<div class="flex items-start md:items-center flex-col md:flex-row justify-between">
		<h1 class="text-3xl font-bold tracking-tight text-foreground">
			{m['dashboard.items.title']()}
		</h1>
		{#if role === 'admin'}
			<Button
				class="gap-2 shadow-sm mt-4 md:mt-0"
				onclick={() => {
					error.fieldErrors = {};
					error.isCreateDialogOpen = true;
				}}
			>
				<PlusIcon />
				{m['dashboard.items.new']()}
			</Button>
		{/if}
	</div>

	<div
		class="rounded-xl border border-border bg-card overflow-hidden shadow-sm w-full overflow-x-auto"
	>
		<Table class="min-w-300">
			<TableHeaderWithContent />

			<TableBody
				>{#await data.itemsPayload}
					{#each [1, 2, 3, 4, 5] as skeletonIndex (skeletonIndex)}
						<TableRowSkeleton />
					{/each}
				{:then resolved}
					{#if resolved.data.length === 0}
						<TableRow>
							<TableCell colspan={12} class="h-32 text-center text-muted-foreground">
								{m['dashboard.items.empty']()}
							</TableCell>
						</TableRow>
					{:else}
						{#each resolved.data as item (item.id)}
							<TableRowWithContent {item} {role} bind:error />
						{/each}
					{/if}
				{/await}
			</TableBody>
		</Table>
	</div>

	{#await data.itemsPayload}
		<PaginationSkeleton />
	{:then resolved}
		<Pagination meta={resolved.meta} />
	{/await}
</div>

<CreateDashboardItemDialog bind:error />

<ErrorDialog bind:error />
