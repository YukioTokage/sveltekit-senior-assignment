<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/primitives/Button.svelte';
	import InlineInput from '$lib/components/controls/inputs/InlineInput.svelte';
	import CustomInput from '$lib/components/controls/inputs/CustomInput.svelte';
	import Badge from '$lib/components/primitives/Badge.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import Checkbox from '$lib/components/controls/inputs/Checkbox.svelte';
	import Select from '$lib/components/controls/inputs/Select.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}

<Button variant="default" onclick={() => console.log('Клік')}>Зберегти</Button>

<Button variant="outline" href="/dashboard">До панелі керування</Button>

<InlineInput
	value="Початкове значення"
	onsave={(newValue: string) => {
		console.log('Збережено нове значення:', newValue);
	}}
	class="max-w-50"
/>

<CustomInput value="Початкове значення" class="max-w-50" />

<Card class="max-w-50">
	<p>Це вміст картки.</p>

	<Badge variant="success" class="max-w-50">Успішно</Badge>

	<Checkbox checked={true} class="max-w-50" />
	<Checkbox checked={false} class="max-w-50" />
</Card>

<Select value="option1" class="max-w-50">
	<option value="option1">Опція 1</option>
	<option value="option2">Опція 2</option>
	<option value="option3">Опція 3</option>
</Select>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>
