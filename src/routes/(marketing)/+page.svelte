<script lang="ts">
	import HeadMeta from '$lib/components/layout/HeadMeta.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/primitives/Button.svelte';
</script>

<HeadMeta title={m['home.meta.title']()} description={m['home.meta.description']()} />

<div class="flex flex-col gap-20 pb-20">
	<section class="container mx-auto px-4 pt-24 text-center sm:pt-32">
		<h1
			class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
		>
			{m['home.hero.title']()}
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
			{m['home.hero.subtitle']()}
		</p>
		<div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
			<Button href="/blog" variant="default" size="lg">
				{m['home.hero.cta']()}
			</Button>
		</div>
	</section>

	<section class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			{m['home.features.title']()}
		</h2>

		<div class="grid gap-8 md:grid-cols-3">
			<article
				class="flex flex-col items-center text-center rounded-lg border bg-card p-6 shadow-sm"
			>
				<div class="mb-4 rounded-full bg-primary/10 p-3 text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg
					>
				</div>
				<h3 class="text-xl font-bold">{m['feature.fast.title']()}</h3>
				<p class="mt-2 text-muted-foreground">
					{m['feature.fast.desc']()}
				</p>
			</article>

			<article
				class="flex flex-col items-center text-center rounded-lg border bg-card p-6 shadow-sm"
			>
				<div class="mb-4 rounded-full bg-primary/10 p-3 text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"
						/><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path
							d="M10 2v2"
						/><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></svg
					>
				</div>
				<h3 class="text-xl font-bold">{m['feature.i18n.title']()}</h3>
				<p class="mt-2 text-muted-foreground">
					{m['feature.i18n.desc']()}
				</p>
			</article>

			<article
				class="flex flex-col items-center text-center rounded-lg border bg-card p-6 shadow-sm"
			>
				<div class="mb-4 rounded-full bg-primary/10 p-3 text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path
							d="M7 11V7a5 5 0 0 1 10 0v4"
						/></svg
					>
				</div>
				<h3 class="text-xl font-bold">{m['feature.secure.title']()}</h3>
				<p class="mt-2 text-muted-foreground">
					{m['feature.secure.desc']()}
				</p>
			</article>
		</div>
	</section>
</div>
