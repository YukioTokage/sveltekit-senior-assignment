<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { localizedResolve } from '$lib/utils/route';

	type BaseProps = {
		variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
		size?: 'sm' | 'default' | 'lg' | 'icon';
		children: Snippet;
		class?: string;
	};

	type AnchorProps = BaseProps & HTMLAnchorAttributes & { href: string };
	type ButtonProps = BaseProps & HTMLButtonAttributes & { href?: never };

	type Props = AnchorProps | ButtonProps;

	let {
		variant = 'default',
		size = 'default',
		href,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer';

	const variants = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90',
		destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
		outline: 'border border-input hover:bg-secondary hover:text-secondary-foreground',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		ghost: 'hover:bg-secondary hover:text-secondary-foreground'
	};

	const sizes = {
		default: 'h-10 py-2 px-4',
		sm: 'h-9 px-3 rounded-md',
		lg: 'h-11 px-8 rounded-md',
		icon: 'h-10 w-10'
	};

	let appliedClasses = $derived(`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

{#if href}
	<a href={localizedResolve(href)} class={appliedClasses} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button class={appliedClasses} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
