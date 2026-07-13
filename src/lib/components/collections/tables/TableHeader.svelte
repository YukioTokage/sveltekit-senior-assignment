<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLTableSectionElement> & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<thead class="bg-muted/50 [&_tr]:border-b {className}" {...rest}>
	{@render children()}
</thead>
