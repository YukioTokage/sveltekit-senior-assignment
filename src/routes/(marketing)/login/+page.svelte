<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import * as m from '$lib/paraglide/messages.js';

	import Button from '$lib/components/primitives/Button.svelte';
	import CustomInput from '$lib/components/controls/inputs/CustomInput.svelte';
	import Card from '$lib/components/layout/Card.svelte';

	let { form }: { form: ActionData } = $props();
	let isSubmitting = $state(false);

	let formEmail = $derived(form && 'email' in form ? (form.email as string) : '');
</script>

<div class="min-h-[80vh] flex items-center justify-center px-4">
	<Card class="w-full max-w-md p-8! border-border">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-foreground">{m['login.title']()}</h1>
			<p class="text-sm text-muted-foreground mt-2">
				{m['common.use']()} <span class="font-mono bg-muted px-1 rounded">admin@demo.test</span>,
				<span class="font-mono bg-muted px-1 rounded">editor</span>, {m['common.or']()}
				<span class="font-mono bg-muted px-1 rounded">viewer</span>.
				<br />{m['login.password']()}: <span class="font-mono bg-muted px-1 rounded">demo1234</span>
			</p>
		</div>

		<form
			method="POST"
			action="?/login"
			class="space-y-6"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			{#if form?.error}
				<div
					class="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md"
				>
					{form.error}
				</div>
			{/if}

			<div class="space-y-4">
				<div class="space-y-1.5">
					<label for="email" class="text-sm font-medium text-foreground">{m['login.email']()}</label
					>
					<CustomInput id="email" name="email" type="email" value={formEmail} required />
				</div>

				<div class="space-y-1.5">
					<label for="password" class="text-sm font-medium text-foreground"
						>{m['login.password']()}</label
					>
					<CustomInput id="password" name="password" type="password" required />
				</div>
			</div>

			<Button type="submit" disabled={isSubmitting} class="w-full">
				{isSubmitting ? m['common.loading']() : m['login.submit']()}
			</Button>
		</form>
	</Card>
</div>
