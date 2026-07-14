<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<div
	class="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
>
	<Header />

	<main class="flex-1 w-full">
		{@render children()}
	</main>

	<Footer />
</div>
