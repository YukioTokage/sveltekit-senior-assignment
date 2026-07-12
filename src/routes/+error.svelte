<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import { localizedResolve } from '$lib/utils/route';

	// TODO: Develop layout
</script>

<div class="flex min-h-screen items-center justify-center bg-background p-4">
	<div class="max-w-md w-full text-center space-y-4">
		<span
			class="text-xs font-semibold uppercase tracking-wider text-warning bg-warning/10 px-2 py-1 rounded-sm"
		>
			{m['error.global_tag']()}
		</span>

		<h1 class="text-6xl font-bold text-foreground">{page.status}</h1>
		<p class="text-xl text-muted-foreground">
			{page.error?.message || m['error.fallback']()}
		</p>

		<a
			href={localizedResolve('/')}
			class="inline-block mt-6 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
		>
			{m['error.go_home']()}
		</a>
	</div>
</div>
