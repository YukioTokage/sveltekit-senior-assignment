<script lang="ts">
	import CrossIcon from '$lib/components/icons/CrossIcon.svelte';
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		onclose?: () => void;
		children: Snippet;
	}

	let { open = $bindable(false), title, onclose, children }: Props = $props();

	let dialogRef: HTMLDivElement | undefined = $state();
	let previouslyFocused: HTMLElement | null = null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDialog();
			return;
		}

		if (event.key === 'Tab' && dialogRef) {
			const focusableElements = dialogRef.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);

			if (focusableElements.length === 0) {
				event.preventDefault();
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				lastElement.focus();
				event.preventDefault();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				firstElement.focus();
				event.preventDefault();
			}
		}
	}

	function closeDialog() {
		open = false;
		if (onclose) onclose();
	}

	$effect(() => {
		if (open) {
			previouslyFocused = document.activeElement as HTMLElement;
			document.body.style.overflow = 'hidden';

			tick().then(() => {
				if (dialogRef) {
					const firstFocusable = dialogRef.querySelector<HTMLElement>(
						'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
					);
					if (firstFocusable) {
						firstFocusable.focus();
					} else {
						dialogRef.focus();
					}
				}
			});
		} else {
			document.body.style.overflow = '';
			if (previouslyFocused) {
				previouslyFocused.focus();
			}
		}
	});
</script>

{#if open}
	<button
		type="button"
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100"
		onclick={closeDialog}>‎</button
	>

	<div
		bind:this={dialogRef}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'dialog-title' : undefined}
		tabindex="-1"
		onkeydown={handleKeydown}
		class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg sm:rounded-lg"
	>
		{#if title}
			<h2 id="dialog-title" class="text-lg font-semibold leading-none tracking-tight">
				{title}
			</h2>
		{/if}

		<div class="py-4">
			{@render children()}
		</div>

		<button
			type="button"
			onclick={closeDialog}
			class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
		>
			<span class="sr-only">Close</span>
			<CrossIcon />
		</button>
	</div>
{/if}
