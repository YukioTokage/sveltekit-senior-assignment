<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import { locales, getLocale } from '$lib/paraglide/runtime.js';
	import { localizedResolve } from '$lib/utils/route.js';
	import { fade, fly } from 'svelte/transition';
	import { disableSelfLink } from '$lib/directive/disableSelfLink.svelte.js';
	import CrossIcon from '$lib/components/icons/CrossIcon.svelte';

	let pathname = $derived(page.url.pathname);
	let currentLang = $derived(getLocale());

	const navLinks = $derived([
		{ href: '/', label: m['nav.home']() },
		{ href: '/blog', label: m['nav.blog']() },
		{ href: '/search', label: m['nav.search']() }
	]);

	let { onclose }: { onclose?: () => void } = $props();
</script>

<button
	type="button"
	aria-label="Backdrop"
	class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
	transition:fade={{ duration: 150 }}
	onclick={onclose}
></button>

<div
	id="mobile-menu"
	class="fixed inset-y-0 right-0 z-50 h-full w-full max-w-xs border-l bg-background p-6 shadow-lg md:hidden flex flex-col justify-between"
	transition:fly={{ x: 320, duration: 250 }}
>
	<div>
		<div class="flex items-center justify-between pb-6 border-b">
			<a
				href={localizedResolve('/')}
				use:disableSelfLink
				class="text-xl font-bold tracking-tight"
				onclick={onclose}
			>
				<span class="text-primary">Ego</span>Blog
			</a>
			<button
				type="button"
				class="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				aria-label="Close menu"
				onclick={onclose}
			>
				<CrossIcon />
			</button>
		</div>

		<nav aria-label="Main mobile" class="mt-6">
			<ul class="flex flex-col gap-4">
				{#each navLinks as { href, label } (href)}
					<li>
						<a
							href={localizedResolve(href)}
							use:disableSelfLink
							aria-current={pathname === href ? 'page' : undefined}
							class="block rounded-md px-3 py-2 text-base font-semibold transition-colors hover:bg-accent hover:text-foreground
                            {pathname === href
								? 'bg-accent text-primary'
								: 'text-muted-foreground'}"
							onclick={onclose}
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="space-y-6 border-t pt-6">
		<div>
			<div class="grid grid-cols-2 gap-2 rounded-md border bg-muted/50 p-1">
				{#each locales as locale (locale)}
					<a
						href={localizedResolve(pathname, { locale })}
						data-sveltekit-reload
						use:disableSelfLink
						aria-current={locale === currentLang ? 'true' : undefined}
						class="flex h-9 items-center justify-center rounded text-sm font-bold uppercase transition-colors
                        {locale === currentLang
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
						onclick={onclose}
					>
						{locale}
					</a>
				{/each}
			</div>
		</div>

		<a
			href={localizedResolve('/dashboard')}
			use:disableSelfLink
			class="flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			onclick={onclose}
		>
			{m['nav.dashboard']()}
		</a>
	</div>
</div>
