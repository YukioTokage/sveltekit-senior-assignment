<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import SideMenu from '$lib/components/layout/dashboard/SideMenu.svelte';
	import Header from '$lib/components/layout/dashboard/Header.svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let isMobileMenuOpen = $state(false);

	$effect(() => {
		if (page.url.pathname) {
			isMobileMenuOpen = false;
		}
	});
</script>

<div class="h-screen w-full bg-background text-foreground flex overflow-hidden">
	<div class="hidden md:block h-full">
		<SideMenu />
	</div>

	{#if isMobileMenuOpen}
		<div class="fixed inset-0 z-50 md:hidden flex">
			<div
				class="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
				onclick={() => (isMobileMenuOpen = false)}
				onkeydown={(e) => e.key === 'Escape' && (isMobileMenuOpen = false)}
				role="button"
				tabindex="0"
				aria-label="Close menu"
			></div>

			<div
				class="relative w-64 max-w-sm h-full shrink-0 bg-card z-50 shadow-2xl"
				transition:fly={{ x: -256, duration: 300, opacity: 1 }}
			>
				<SideMenu />
			</div>
		</div>
	{/if}

	<div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
		<Header user={data.session.user} onMenuClick={() => (isMobileMenuOpen = true)} />

		<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
			{@render children()}
		</main>
	</div>
</div>
