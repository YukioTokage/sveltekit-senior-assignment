import { getItems, updateItem, createItem } from '$lib/server/api/items';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { itemSchema, type Item, type User } from '$lib/schemas';

export const load: PageServerLoad = async ({ url, depends }) => {
	depends('app:items');

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const status = (url.searchParams.get('status') || 'all') as Item['status'] | 'all';
	const search = url.searchParams.get('search') || '';
	const sortBy = (url.searchParams.get('sortBy') || 'updatedAt') as keyof Item;
	const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

	const itemsPromise = getItems({
		page,
		limit,
		status,
		search,
		sortBy,
		sortOrder
	});

	return {
		itemsPayload: itemsPromise
	};
};

export const actions: Actions = {
	update: async ({ request, cookies }) => {
		const session = cookies.get('session');
		if (!session) return fail(401, { error: 'Unauthorized' });
		const user: Omit<User, 'password'> = JSON.parse(session);

		if (user.role !== 'admin' && user.role !== 'editor') {
			return fail(403, { error: 'Forbidden: You do not have permission to edit items.' });
		}

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
	},

	create: async ({ request, cookies }) => {
		const session = cookies.get('session');
		if (!session) return fail(401, { error: 'Unauthorized' });
		const user: Omit<User, 'password'> = JSON.parse(session);

		if (user.role !== 'admin') {
			return fail(403, { error: 'Forbidden: Only administrators can create new items.' });
		}

		const formData = await request.formData();

		const impressions = Number(formData.get('impressions')) || 0;
		const clicks = Number(formData.get('clicks')) || 0;
		const ctr = impressions > 0 ? clicks / impressions : 0;

		const rawTags = (formData.get('tags') as string) || '';
		const tags = rawTags
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t.length > 0);

		const rawData = {
			id: crypto.randomUUID(),
			name: formData.get('name'),
			status: formData.get('status'),
			channel: formData.get('channel'),
			owner: {
				id: 'usr-admin-01',
				name: 'Admin User'
			},
			budget: Number(formData.get('budget')) || 0,
			spent: Number(formData.get('spent')) || 0,
			impressions,
			clicks,
			ctr,
			startDate: formData.get('startDate'),
			endDate: formData.get('endDate'),
			updatedAt: new Date().toISOString(),
			tags
		};

		const validation = itemSchema.safeParse(rawData);

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
				error: 'Form validation failed',
				details: fieldErrors
			});
		}

		try {
			await createItem(validation.data);
			return { success: true };
		} catch {
			return fail(500, { error: 'Failed to write into database storage' });
		}
	}
};
