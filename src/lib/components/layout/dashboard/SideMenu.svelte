<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/primitives/Button.svelte';
	import { localizedResolve } from '$lib/utils/route.js';
	import { disableSelfLink } from '$lib/directive/disableSelfLink.svelte.js';
	import BurgerIcon from '$lib/components/icons/BurgerIcon.svelte';
	import LogoutIcon from '$lib/components/icons/LogoutIcon.svelte';

	const menuItems = [
		{
			href: '/dashboard',
			label: m['dashboard.title']()
		},
		{
			href: '/dashboard/items',
			label: m['dashboard.items.title']()
		}
	];
</script>

<aside class="w-64 bg-card text-card-foreground border-r border-border flex flex-col h-full">
	<div class="h-16 flex items-center px-6 border-b border-border shrink-0">
		<span class="text-xl font-bold tracking-tight text-foreground">AdminPanel</span>
	</div>

	<nav class="flex-1 p-4 space-y-1 overflow-y-auto">
		{#each menuItems as item (item.href)}
			{@const isActive = page.url.pathname == item.href}
			<a
				href={localizedResolve(item.href)}
				use:disableSelfLink
				class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors {isActive
					? 'bg-primary text-primary-foreground shadow-sm'
					: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				<BurgerIcon />
				{item.label}
			</a>
		{/each}
	</nav>

	<div class="p-4 border-t border-border shrink-0">
		<form action="/login?/logout" method="POST">
			<Button
				variant="ghost"
				size="sm"
				type="submit"
				class="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
			>
				<LogoutIcon />
				{m['nav.logout']()}
			</Button>
		</form>
	</div>
</aside>
