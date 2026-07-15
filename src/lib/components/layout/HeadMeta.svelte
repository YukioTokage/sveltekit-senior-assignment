<script lang="ts">
	import { page } from '$app/state';
	import { headerState } from '$lib/state/header.svelte.js';
	import { locales, getLocale, localizeHref } from '$lib/paraglide/runtime.js';

	interface Props {
		title?: string;
		description?: string;
		keywords?: string | null;
		image?: string;
		imageType?: string;
		imageWidth?: string;
		imageHeight?: string;
		schemaData?: Record<string, unknown> | null;
		enableNoIndex?: boolean;
		ogType?: 'website' | 'article' | 'profile';
	}

	let {
		title = '',
		description = '',
		keywords = null,
		image = '/logo-ego.jpg',
		imageType = 'image/png',
		imageWidth = '1200',
		imageHeight = '630',
		schemaData = null,
		enableNoIndex = false,
		ogType = 'website'
	}: Props = $props();

	let origin = $derived(page.url.origin);
	let pathname = $derived(page.url.pathname);
	let canonicalUrl = $derived(`${origin}${pathname}`);

	let finalTitle = $derived(title || headerState.title);
	let finalDescription = $derived(description || headerState.description);

	let imageUrl = $derived(image.startsWith('http') ? image : `${origin}${image}`);

	let currentLang = $derived(getLocale());
</script>

<svelte:head>
	<title>{finalTitle}</title>
	<meta name="description" content={finalDescription} />
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<link rel="canonical" href={canonicalUrl} />

	{#each locales as altLocale (altLocale)}
		<link
			rel="alternate"
			hreflang={altLocale}
			href="{origin}{localizeHref(pathname, { locale: altLocale })}"
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href="{origin}{localizeHref(pathname, { locale: 'en' })}"
	/>

	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={finalTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:type" content={imageType} />
	<meta property="og:image:width" content={imageWidth} />
	<meta property="og:image:height" content={imageHeight} />
	<meta property="og:locale" content={currentLang} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={finalTitle} />
	<meta name="twitter:description" content={finalDescription} />
	<meta name="twitter:image" content={imageUrl} />

	{#if schemaData}
		<svelte:element this={"script"} type="application/ld+json">
			{JSON.stringify(schemaData)}
		</svelte:element>
	{/if}

	{#if enableNoIndex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}
</svelte:head>
