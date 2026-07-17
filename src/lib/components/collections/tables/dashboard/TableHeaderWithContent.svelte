<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import TableHeader from '$lib/components/collections/tables/TableHeader.svelte';
	import TableRow from '$lib/components/collections/tables/TableRow.svelte';
	import TableHead from '$lib/components/collections/tables/TableHead.svelte';
</script>

<TableHeader>
	<TableRow>
		<TableHead class="w-24">{m['dashboard.items.column.id']()}</TableHead>
		<TableHead class="w-56">{m['dashboard.items.column.name']()}</TableHead>
		<TableHead>{m['dashboard.items.column.status']()}</TableHead>
		<TableHead>{m['dashboard.items.column.channel']()}</TableHead>
		<TableHead>{m['dashboard.items.column.owner']()}</TableHead>
		<TableHead class="text-right">{m['dashboard.items.column.budget']()}</TableHead>
		<TableHead class="text-right">{m['dashboard.items.column.spent']()}</TableHead>
		<TableHead class="text-right">{m['dashboard.items.column.impressions']()}</TableHead>
		<TableHead class="text-right">{m['dashboard.items.column.clicks']()}</TableHead>
		<TableHead class="text-right">{m['dashboard.items.column.ctr']()}</TableHead>
		<TableHead>{m['dashboard.items.column.timeline']()}</TableHead>
		<TableHead>{m['dashboard.items.column.tags']()}</TableHead>
	</TableRow>
</TableHeader>
