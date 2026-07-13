<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes & {
		checked?: boolean;
	};

	let { checked = $bindable(false), class: className = '', ...rest }: Props = $props();
</script>

<input
	type="checkbox"
	bind:checked
	class="peer h-4 w-4 shrink-0 rounded-sm border-primary text-primary shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {className}"
	{...rest}
/>
