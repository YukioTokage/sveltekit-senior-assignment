<script lang="ts">
	import { page } from '$app/state';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { locales, getLocale } from '$lib/paraglide/runtime.js';
	import { localizedResolve } from '$lib/utils/route.js';
	import { disableSelfLink } from '$lib/directive/disableSelfLink.svelte.js';

	let pathname = $derived(page.url.pathname);
	let currentLang = $derived(getLocale());

	const navLinks = $derived([
		{ href: '/', label: m['nav.home']() },
		{ href: '/blog', label: m['nav.blog']() },
		{ href: '/search', label: m['nav.search']() }
	]);

	let isMenuOpen = $state(false);

	function openMenu() {
		isMenuOpen = true;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	$effect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 supports-backdrop-filter:bg-background/60"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
		<a
			href={localizedResolve('/')}
			use:disableSelfLink
			class="flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
		>
			<span class="text-primary">Demo</span>Blog
		</a>

		<nav aria-label="Main" class="hidden md:flex items-center gap-6">
			<ul class="flex items-center gap-6">
				{#each navLinks as { href, label } (href)}
					<li>
						<a
							href={localizedResolve(href)}
							use:disableSelfLink
							aria-current={pathname === href ? 'page' : undefined}
							class="text-sm font-medium transition-colors hover:text-primary
                            {pathname === href ? 'text-primary' : 'text-muted-foreground'}"
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-4">
			<div
				class="flex items-center rounded-md border bg-muted/50 p-1"
				aria-label="Language switcher"
			>
				{#each locales as locale (locale)}
					<a
						href={localizedResolve(pathname, { locale })}
						data-sveltekit-reload
						use:disableSelfLink
						aria-current={locale === currentLang ? 'true' : undefined}
						class="rounded px-2.5 py-1 text-xs font-semibold uppercase transition-colors
                        {locale === currentLang
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{locale}
					</a>
				{/each}
			</div>

			<a
				href={localizedResolve('/dashboard')}
				use:disableSelfLink
				class="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				{m['nav.dashboard']()}
			</a>

			<button
				type="button"
				class="inline-flex md:hidden items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				aria-expanded={isMenuOpen}
				aria-controls="mobile-menu"
				aria-label="Toggle menu"
				onclick={openMenu}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="4" x2="20" y1="12" y2="12" />
					<line x1="4" x2="20" y1="6" y2="6" />
					<line x1="4" x2="20" y1="18" y2="18" />
				</svg>
			</button>
		</div>
	</div>
</header>

{#if isMenuOpen}
	<SideMenu onclose={closeMenu} />
{/if}
