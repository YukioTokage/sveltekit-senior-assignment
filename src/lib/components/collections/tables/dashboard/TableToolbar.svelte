<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import CustomInput from '$lib/components/controls/inputs/CustomInput.svelte';
	import Select from '$lib/components/controls/inputs/Select.svelte';
	import type { Pathname } from '$app/types';
	import * as m from '$lib/paraglide/messages.js';

	async function updateFilter(key: string, value: string) {
		const url = new URL(page.url);
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
		if (key !== 'page') url.searchParams.set('page', '1');

		try {
			await goto(resolve(`${url.pathname}${url.search}` as Pathname), {
				keepFocus: true,
				noScroll: true
			});
		} catch (error) {
			console.error('Filter error:', error);
		}
	}
</script>

<div
	class="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm mb-6"
>
	<div class="flex-1">
		<CustomInput
			type="search"
			placeholder={m['dashboard.items.filter.search_placeholder']()}
			value={page.url.searchParams.get('search') || ''}
			onchange={(e) => updateFilter('search', e.currentTarget.value)}
		/>
	</div>

	<div class="w-full sm:w-48">
		<Select
			value={page.url.searchParams.get('status') || 'all'}
			onchange={(e) => updateFilter('status', e.currentTarget.value)}
		>
			<option value="all">{m['dashboard.items.filter.status.all']()}</option>
			<option value="active">{m['dashboard.items.filter.status.active']()}</option>
			<option value="paused">{m['dashboard.items.filter.status.paused']()}</option>
			<option value="completed">{m['dashboard.items.filter.status.completed']()}</option>
			<option value="draft">{m['dashboard.items.filter.status.draft']()}</option>
			<option value="scheduled">{m['dashboard.items.filter.status.scheduled']()}</option>
			<option value="archived">{m['dashboard.items.filter.status.archived']()}</option>
		</Select>
	</div>

	<div class="w-full sm:w-48">
		<Select
			value={page.url.searchParams.get('sortBy') || 'updatedAt'}
			onchange={(e) => updateFilter('sortBy', e.currentTarget.value)}
		>
			<option value="updatedAt">{m['dashboard.items.filter.sort.updatedAt']()}</option>
			<option value="budget">{m['dashboard.items.filter.sort.budget']()}</option>
			<option value="name">{m['dashboard.items.filter.sort.name']()}</option>
			<option value="ctr">{m['dashboard.items.filter.sort.ctr']()}</option>
		</Select>
	</div>
</div>
