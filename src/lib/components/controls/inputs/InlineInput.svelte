<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		value: string;
		onsave: (newValue: string) => void;
		oncancel?: () => void;
		class?: string;
	}

	let { value = '', onsave, oncancel, class: className = '' }: Props = $props();

	let isEditing = $state(false);
	let editValue = $state('');
	let inputRef: HTMLInputElement | undefined = $state();

	async function startEditing() {
		editValue = value;
		isEditing = true;

		await tick();
		inputRef?.focus();
	}

	function handleSave() {
		if (!isEditing) return;
		isEditing = false;

		if (editValue !== value) {
			onsave(editValue);
		}
	}

	function handleCancel() {
		if (!isEditing) return;
		isEditing = false;
		editValue = value;
		if (oncancel) oncancel();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	}
</script>

{#if isEditing}
	<input
		bind:this={inputRef}
		bind:value={editValue}
		onkeydown={handleKeyDown}
		onblur={handleSave}
		class="inline-flex h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring {className}"
	/>
{:else}
	<button
		type="button"
		onclick={startEditing}
		class="inline-flex h-8 w-full items-center justify-start rounded-md border border-transparent px-2 py-1 text-sm transition-colors hover:bg-secondary/80 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring {className}"
	>
		<span class="truncate">{value}</span>
	</button>
{/if}
