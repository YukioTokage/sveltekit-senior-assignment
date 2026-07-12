<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';
	import { localizedResolve } from '$lib/utils/route';

	// TODO: Develop layout
</script>

<div
	class="flex flex-col items-center justify-center min-h-[50vh] p-8 border border-border rounded-lg bg-surface-secondary text-center space-y-4 m-4"
>
	<div
		class="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning mx-auto"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
			/>
		</svg>
	</div>

	<h2 class="text-2xl font-bold text-foreground">
		{m['error.dashboard.title']()} ({page.status})
	</h2>

	<p class="text-muted-foreground max-w-sm mx-auto">
		{page.error?.message || m['error.dashboard.fallback']()}
	</p>

	<div class="flex gap-4 justify-center pt-2">
		<button
			onclick={() => window.location.reload()}
			class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity text-sm"
		>
			{m['error.btn.refresh']()}
		</button>

		<a
			href={localizedResolve('/dashboard')}
			class="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors text-sm"
		>
			{m['error.btn.dashboard']()}
		</a>
	</div>
</div>
