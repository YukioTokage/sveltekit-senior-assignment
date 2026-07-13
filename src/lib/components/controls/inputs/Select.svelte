<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLSelectAttributes & {
		value?: string | number;
		children: Snippet;
	};

	let { value = $bindable(), class: className = '', children, ...rest }: Props = $props();
</script>

<select
	bind:value
	class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {className}"
	{...rest}
>
	{@render children()}
</select>
