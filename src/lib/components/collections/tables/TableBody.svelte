<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLTableSectionElement> & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<tbody class="[&_tr:last-child]:border-0 {className}" {...rest}>
	{@render children()}
</tbody>
