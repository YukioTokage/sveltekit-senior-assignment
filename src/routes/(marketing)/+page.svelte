<script lang="ts">
	import HeadMeta from '$lib/components/layout/HeadMeta.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/primitives/Button.svelte';
	import LightningIcon from '$lib/components/icons/LightningIcon.svelte';
	import WandIcon from '$lib/components/icons/WandIcon.svelte';
	import LockIcon from '$lib/components/icons/LockIcon.svelte';
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
					<LightningIcon />
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
					<WandIcon />
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
					<LockIcon />
				</div>
				<h3 class="text-xl font-bold">{m['feature.secure.title']()}</h3>
				<p class="mt-2 text-muted-foreground">
					{m['feature.secure.desc']()}
				</p>
			</article>
		</div>
	</section>
</div>
