<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { localizedResolve } from '$lib/utils/route.js';
	import { disableSelfLink } from '$lib/directive/disableSelfLink.svelte.js';
	import { page } from '$app/state';

	let pathname = $derived(page.url.pathname);
</script>

<footer class="mt-auto border-t bg-background py-8">
	<div class="container mx-auto px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
		<p class="text-sm text-muted-foreground">
			{m['footer.copy']()}
		</p>

		<nav aria-label="Footer Navigation" class="flex gap-6 text-sm font-medium">
			<a
				href={localizedResolve('/blog')}
				use:disableSelfLink
				class="transition-colors hover:text-primary {pathname === '/terms'
					? 'text-primary'
					: 'text-muted-foreground'}"
			>
				{m['nav.blog']()}
			</a>
			<a
				href={localizedResolve('/dashboard')}
				use:disableSelfLink
				class="transition-colors hover:text-primary {pathname === '/privacy'
					? 'text-primary'
					: 'text-muted-foreground'}"
			>
				{m['nav.dashboard']()}
			</a>
		</nav>
	</div>
</footer>
