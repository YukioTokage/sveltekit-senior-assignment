<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<div
	class="rounded-lg p-3 border border-border bg-card text-card-foreground shadow-sm {className}"
	{...rest}
>
	{@render children()}
</div>
