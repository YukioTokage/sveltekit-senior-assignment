<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLTdAttributes & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<td class="p-4 align-middle has-[[role=checkbox]]:pr-0 {className}" {...rest}>
	{@render children()}
</td>
