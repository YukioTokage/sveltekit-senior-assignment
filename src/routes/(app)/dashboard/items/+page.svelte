<script lang="ts">
	import Table from '$lib/components/collections/tables/Table.svelte';
	import TableHeader from '$lib/components/collections/tables/TableHeader.svelte';
	import TableBody from '$lib/components/collections/tables/TableBody.svelte';
	import TableRow from '$lib/components/collections/tables/TableRow.svelte';
	import TableHead from '$lib/components/collections/tables/TableHead.svelte';
	import TableCell from '$lib/components/collections/tables/TableCell.svelte';

	import Badge from '$lib/components/primitives/Badge.svelte';
	import InlineInput from '$lib/components/controls/inputs/InlineInput.svelte';

	import Button from '$lib/components/primitives/Button.svelte';
	import Dialog from '$lib/components/layout/Dialog.svelte';

	let { data } = $props();
	let items = $state(data.items);

	let isDeleteDialogOpen = $state(false);
	let itemToDelete = $state<string | null>(null);

	function confirmDelete() {
		// TODO: Implement delete logic
		console.log('Deleting:', itemToDelete);
		isDeleteDialogOpen = false;
	}
</script>

<Button
	variant="destructive"
	onclick={() => {
		itemToDelete = 'Company 1';
		isDeleteDialogOpen = true;
	}}
>
	Delete company
</Button>

<Dialog bind:open={isDeleteDialogOpen} title="Confirm action">
	<p class="text-sm text-muted-foreground">
		Are you sure you want to delete <strong>{itemToDelete}</strong>? This action cannot be undone.
	</p>

	<div class="mt-6 flex justify-end gap-3">
		<Button variant="outline" onclick={() => (isDeleteDialogOpen = false)}>Cancel</Button>
		<Button variant="destructive" onclick={confirmDelete}>Yes, delete</Button>
	</div>
</Dialog>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead class="w-25">ID</TableHead>
			<TableHead>Company name</TableHead>
			<TableHead>Status</TableHead>
			<TableHead class="text-right">Budget</TableHead>
		</TableRow>
	</TableHeader>

	<TableBody>
		{#each items as item (item.id)}
			<TableRow>
				<TableCell class="font-medium">{item.id}</TableCell>

				<TableCell>
					<InlineInput
						value={item.name}
						onsave={(val) => {
							item.name = val; /* TODO: Implement save functionality */
						}}
					/>
				</TableCell>

				<TableCell>
					{#if item.status === 'active'}
						<Badge variant="success">Active</Badge>
					{:else if item.status === 'paused'}
						<Badge variant="warning">Paused</Badge>
					{:else}
						<Badge variant="secondary">Completed</Badge>
					{/if}
				</TableCell>

				<TableCell class="text-right">${item.budget}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
