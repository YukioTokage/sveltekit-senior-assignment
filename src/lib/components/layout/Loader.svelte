<script lang="ts">
	import LoaderIcon from '$lib/components/icons/LoaderIcon.svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		text?: string;
		class?: string;
	}

	let { size = 'md', text = '', class: className = '' }: Props = $props();

	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	};
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-200"
>
	<div
		class="flex flex-col items-center justify-center gap-2 {className}"
		role="status"
		aria-label="Loading"
	>
		<LoaderIcon classes={sizeClasses[size]} />

		{#if text}
			<span class="text-sm font-medium text-muted-foreground">{text}</span>
		{/if}
	</div>
</div>
