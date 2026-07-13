<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
		children: Snippet;
	};

	let { variant = 'default', class: className = '', children, ...rest }: Props = $props();

	const baseClasses =
		'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

	const variants = {
		default: 'border-transparent bg-primary text-primary-foreground',
		secondary: 'border-transparent bg-secondary text-secondary-foreground',
		destructive: 'border-transparent bg-destructive text-destructive-foreground',
		success: 'border-transparent bg-success text-success-foreground',
		warning: 'border-transparent bg-warning text-warning-foreground',
		outline: 'text-foreground'
	};

	let appliedClasses = $derived(`${baseClasses} ${variants[variant]} ${className}`);
</script>

<div class={appliedClasses} {...rest}>
	{@render children()}
</div>
