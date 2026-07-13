<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLThAttributes & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<th
	class="h-10 px-4 text-left align-middle font-medium text-muted-foreground has-[[role=checkbox]]:pr-0 {className}"
	{...rest}
>
	{@render children()}
</th>
