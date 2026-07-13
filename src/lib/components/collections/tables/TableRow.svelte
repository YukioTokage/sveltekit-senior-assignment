<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLTableRowElement> & { children: Snippet };
	let { class: className = '', children, ...rest }: Props = $props();
</script>

<tr
	class="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted {className}"
	{...rest}
>
	{@render children()}
</tr>
