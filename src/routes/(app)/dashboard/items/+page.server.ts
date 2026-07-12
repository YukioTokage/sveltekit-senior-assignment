import { getItems, updateItem } from '$lib/server/api/items';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { itemSchema, type Item } from '$lib/schemas';

export const load: PageServerLoad = async ({ url, depends }) => {
	depends('app:items');

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const status = (url.searchParams.get('status') || 'all') as Item['status'] | 'all';
	const search = url.searchParams.get('search') || '';
	const sortBy = (url.searchParams.get('sortBy') || 'updatedAt') as keyof Item;
	const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

	const { data, meta } = await getItems({
		page,
		limit,
		status,
		search,
		sortBy,
		sortOrder
	});

	return {
		items: data,
		meta
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Invalid or missing Item ID' });
		}

		const rawUpdates: Record<string, unknown> = {};
		if (formData.has('name')) rawUpdates.name = formData.get('name');
		if (formData.has('status')) rawUpdates.status = formData.get('status');
		if (formData.has('budget')) rawUpdates.budget = Number(formData.get('budget'));

		const updateSchema = itemSchema.partial();
		const validation = updateSchema.safeParse(rawUpdates);

		if (!validation.success) {
			const fieldErrors = validation.error.issues.reduce(
				(acc, issue) => {
					const fieldName = issue.path[0] as string;
					if (fieldName) {
						acc[fieldName] = issue.message;
					}
					return acc;
				},
				{} as Record<string, string>
			);

			return fail(400, {
				error: 'Validation failed',
				details: fieldErrors
			});
		}

		try {
			await updateItem(id, validation.data);
			return { success: true };
		} catch {
			return fail(404, { error: 'Item not found' });
		}
	}
};
