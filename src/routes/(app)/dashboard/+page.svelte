<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/primitives/Button.svelte';
	import { formatNumber } from '$lib/utils/formatters';
	import * as m from '$lib/paraglide/messages.js';
	import ArrowRigthIcon from '$lib/components/icons/ArrowRigthIcon.svelte';
	import CartsIcon from '$lib/components/icons/CartsIcon.svelte';
	import GraphIcon from '$lib/components/icons/GraphIcon.svelte';
	import CoinIcon from '$lib/components/icons/CoinIcon.svelte';
	import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
	import CheckIcon from '$lib/components/icons/CheckIcon.svelte';

	let { data }: { data: PageData } = $props();

	const user = $derived(data.session?.user);
	const role = $derived(user?.role || 'viewer');
	const email = $derived(user?.email || '');

	const permissions = $derived(
		{
			admin: [
				m['dashboard.perm.admin_1'](),
				m['dashboard.perm.admin_2'](),
				m['dashboard.perm.admin_3'](),
				m['dashboard.perm.admin_4']()
			],
			editor: [
				m['dashboard.perm.editor_1'](),
				m['dashboard.perm.editor_2'](),
				m['dashboard.perm.editor_3'](),
				m['dashboard.perm.editor_4']()
			],
			viewer: [m['dashboard.perm.viewer_1'](), m['dashboard.perm.viewer_2']()]
		}[role as 'admin' | 'editor' | 'viewer'] || []
	);
</script>

<div class="space-y-8">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight text-foreground">{m['dashboard.title']()}</h1>
			<p class="text-muted-foreground">
				{m['dashboard.welcome']({ email })}
			</p>
		</div>
		<div>
			<Button href="/dashboard/items" class="gap-2 shadow-sm">
				{m['dashboard.go_to_items']()}
				<ArrowRigthIcon />
			</Button>
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center justify-between pb-2">
				<span class="text-sm font-medium text-muted-foreground"
					>{m['dashboard.metrics.total_campaigns']()}</span
				>
				<CartsIcon />
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-bold tracking-tight text-foreground">220</span>
				<span class="text-xs text-success font-semibold">+12%</span>
			</div>
			<p class="text-xs text-muted-foreground mt-1">{m['dashboard.metrics.campaigns_desc']()}</p>
		</div>

		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center justify-between pb-2">
				<span class="text-sm font-medium text-muted-foreground"
					>{m['dashboard.metrics.avg_ctr']()}</span
				>
				<GraphIcon />
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-bold tracking-tight text-foreground">3.42%</span>
				<span class="text-xs text-success font-semibold">+0.8%</span>
			</div>
			<p class="text-xs text-muted-foreground mt-1">{m['dashboard.metrics.ctr_desc']()}</p>
		</div>

		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center justify-between pb-2">
				<span class="text-sm font-medium text-muted-foreground"
					>{m['dashboard.metrics.total_budget']()}</span
				>
				<CoinIcon />
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-bold tracking-tight text-foreground"
					>${formatNumber(142500)}</span
				>
				<span class="text-xs text-muted-foreground">USD</span>
			</div>
			<p class="text-xs text-muted-foreground mt-1">{m['dashboard.metrics.budget_desc']()}</p>
		</div>

		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center justify-between pb-2">
				<span class="text-sm font-medium text-muted-foreground"
					>{m['dashboard.metrics.test_users']()}</span
				>
				<UsersIcon />
			</div>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-bold tracking-tight text-foreground">3</span>
				<span class="text-xs text-muted-foreground font-medium"
					>{m['dashboard.metrics.active']()}</span
				>
			</div>
			<p class="text-xs text-muted-foreground mt-1">{m['dashboard.metrics.users_desc']()}</p>
		</div>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center justify-between pb-4 border-b border-border">
				<h2 class="text-lg font-semibold tracking-tight text-foreground">
					{m['dashboard.access.title']()}
				</h2>
				<span
					class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize border
                    {role === 'admin' ? 'bg-success/10 text-success border-success/20' : ''}
                    {role === 'editor' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                    {role === 'viewer' ? 'bg-warning/10 text-warning border-warning/20' : ''}"
				>
					{role}
				</span>
			</div>

			<div class="mt-4 space-y-4">
				<p class="text-sm text-muted-foreground">
					{m['dashboard.access.logged_in_as']()} <strong class="text-foreground">{email}</strong>.
					<br />
					{m['dashboard.access.current_role']()}
					<strong class="text-foreground capitalize">{role}</strong>.
				</p>
				<div>
					<h3 class="text-sm font-semibold text-foreground mb-2">
						{m['dashboard.access.permissions_title']()}
					</h3>
					<ul class="space-y-2">
						{#each permissions as perm (perm)}
							<li class="flex items-start gap-2 text-sm text-muted-foreground">
								<CheckIcon />
								{perm}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<div
			class="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
		>
			<div>
				<h2 class="text-lg font-semibold tracking-tight text-foreground mb-2">
					{m['dashboard.system.title']()}
				</h2>
				<p class="text-sm text-muted-foreground mb-4">
					{m['dashboard.system.desc']()}
				</p>

				<div class="space-y-2">
					<div class="flex items-center justify-between p-2 rounded-lg bg-muted/40 text-sm">
						<span class="text-muted-foreground">{m['dashboard.system.db']()}</span>
						<span class="flex items-center gap-1.5 font-medium text-success">
							<span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
							{m['dashboard.system.online']()}
						</span>
					</div>
					<div class="flex items-center justify-between p-2 rounded-lg bg-muted/40 text-sm">
						<span class="text-muted-foreground">{m['dashboard.system.rendering']()}</span>
						<span class="text-foreground font-medium">{m['dashboard.system.ssr']()}</span>
					</div>
					<div class="flex items-center justify-between p-2 rounded-lg bg-muted/40 text-sm">
						<span class="text-foreground font-mono">{m['dashboard.system.version']()}</span>
						<span class="text-muted-foreground font-mono">v1.2.0-stable</span>
					</div>
				</div>
			</div>

			<div class="mt-6 pt-4 border-t border-border flex flex-col gap-2 sm:flex-row">
				<Button href="/dashboard/items" variant="outline" class="w-full sm:w-auto justify-center">
					{m['dashboard.system.manage_items']()}
				</Button>
				<Button href="/blog" variant="ghost" class="w-full sm:w-auto justify-center text-primary">
					{m['dashboard.system.read_blog']()}
				</Button>
			</div>
		</div>
	</div>
</div>
