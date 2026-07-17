<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/primitives/Button.svelte';
	import Dialog from '$lib/components/layout/Dialog.svelte';
	import type { ErrorState } from '$lib/schemas/dashboard';

	let {
		error = $bindable()
	}: {
		error: ErrorState;
	} = $props();
</script>

<Dialog bind:open={error.errorDialogOpen} title={m['error.dashboard.title']()}>
	<div class="space-y-4">
		<p class="text-sm text-muted-foreground">
			{m['error.dashboard.fallback']()}
		</p>
		<div
			class="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 font-medium"
		>
			{error.errorMessage}
		</div>
	</div>
	<div class="mt-6 flex justify-end gap-3">
		<Button variant="outline" onclick={() => (error.errorDialogOpen = false)}>
			{m['common.cancel']()}
		</Button>
	</div>
</Dialog>
