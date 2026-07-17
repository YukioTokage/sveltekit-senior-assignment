<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/primitives/Button.svelte';
	import Dialog from '$lib/components/layout/Dialog.svelte';
	import type { ErrorState } from '$lib/schemas/dashboard';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import CustomInput from '$lib/components/controls/inputs/CustomInput.svelte';
	import Select from '$lib/components/controls/inputs/Select.svelte';

	let {
		error = $bindable()
	}: {
		error: ErrorState;
	} = $props();

	async function handleCreateSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formEl = e.currentTarget as HTMLFormElement;
		const formData = new FormData(formEl);

		try {
			const response = await fetch('?/create', {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type === 'failure') {
				if (result.data?.details) {
					error.fieldErrors = result.data.details as Record<string, string>;
				}
				error.errorMessage = result.data?.error ? String(result.data.error) : 'Validation failed';
				return;
			}

			if (result.type === 'error') {
				error.errorMessage = result.error?.message || 'Server error';
				error.errorDialogOpen = true;
				return;
			}

			error.isCreateDialogOpen = false;
			formEl.reset();
			error.fieldErrors = {};
			invalidateAll();
		} catch (err) {
			error.errorMessage = err instanceof Error ? err.message : 'Submission failed';
			error.errorDialogOpen = true;
		}
	}
</script>

<Dialog bind:open={error.isCreateDialogOpen} title={m['dashboard.items.new']()}>
	<form onsubmit={handleCreateSubmit} class="space-y-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="name"
					>{m['dashboard.items.column.name']()}</label
				>
				<CustomInput name="name" id="name" required />
				{#if error.fieldErrors.name}<p class="text-xs text-destructive">
						{error.fieldErrors.name}
					</p>{/if}
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="status"
					>{m['dashboard.items.column.status']()}</label
				>
				<Select name="status" id="status" required>
					<option value="draft">Draft</option>
					<option value="scheduled">Scheduled</option>
					<option value="active">Active</option>
					<option value="paused">Paused</option>
					<option value="completed">Completed</option>
					<option value="archived">Archived</option>
				</Select>
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="channel"
					>{m['dashboard.items.column.channel']()}</label
				>
				<Select name="channel" id="channel" required>
					<option value="email">Email</option>
					<option value="sms">SMS</option>
					<option value="web">Web</option>
					<option value="social">Social</option>
					<option value="push">Push</option>
				</Select>
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="budget"
					>{m['dashboard.items.column.budget']()}</label
				>
				<CustomInput name="budget" id="budget" type="number" min="0" required />
				{#if error.fieldErrors.budget}<p class="text-xs text-destructive">
						{error.fieldErrors.budget}
					</p>{/if}
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="spent"
					>{m['dashboard.items.column.spent']()}</label
				>
				<CustomInput name="spent" id="spent" type="number" min="0" value="0" />
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="impressions"
					>Impressions</label
				>
				<CustomInput name="impressions" id="impressions" type="number" min="0" value="0" />
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="clicks">Clicks</label>
				<CustomInput name="clicks" id="clicks" type="number" min="0" value="0" />
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="startDate">Start Date</label
				>
				<CustomInput name="startDate" id="startDate" type="date" required />
				{#if error.fieldErrors.startDate}<p class="text-xs text-destructive">
						{error.fieldErrors.startDate}
					</p>{/if}
			</div>

			<div class="space-y-1">
				<label class="text-xs font-semibold text-muted-foreground" for="endDate">End Date</label>
				<CustomInput name="endDate" id="endDate" type="date" required />
				{#if error.fieldErrors.endDate}<p class="text-xs text-destructive">
						{error.fieldErrors.endDate}
					</p>{/if}
			</div>

			<div class="space-y-1 sm:col-span-2">
				<label class="text-xs font-semibold text-muted-foreground" for="tags"
					>Tags (Comma separated)</label
				>
				<CustomInput name="tags" id="tags" placeholder="marketing, q3, promo" />
			</div>
		</div>

		<div class="mt-6 flex justify-end gap-3 border-t border-border pt-4">
			<Button variant="outline" type="button" onclick={() => (error.isCreateDialogOpen = false)}>
				{m['common.cancel']()}
			</Button>
			<Button type="submit">
				{m['common.save']()}
			</Button>
		</div>
	</form>
</Dialog>
