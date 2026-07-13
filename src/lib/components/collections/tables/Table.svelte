<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLTableAttributes & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<div class="relative w-full overflow-auto rounded-md border border-border bg-card {className}">
	<table class="w-full caption-bottom text-sm" {...rest}>
		{@render children()}
	</table>
</div>
