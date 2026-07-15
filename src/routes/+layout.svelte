<script lang="ts">
	import { navigating } from '$app/state';
	import Loader from '$lib/components/layout/Loader.svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	let showLoader = $state(false);

	$effect(() => {
		if (navigating.to) {
			const timer = setTimeout(() => {
				showLoader = true;
			}, 300);

			return () => clearTimeout(timer);
		} else {
			showLoader = false;
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if showLoader}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-200"
	>
		<Loader size="lg" />
	</div>
{/if}

{@render children()}
