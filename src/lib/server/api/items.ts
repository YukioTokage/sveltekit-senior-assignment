import rawItems from '$lib/server/mocks/items.json';
import { itemsFileSchema, type Item } from '$lib/schemas/index';

const initialItems = itemsFileSchema.parse(rawItems);
const dbItems = [...initialItems];

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface GetItemsOptions {
	page?: number;
	limit?: number;
	status?: Item['status'] | 'all';
	search?: string;
	sortBy?: keyof Item;
	sortOrder?: 'asc' | 'desc';
}

export async function getItems(options: GetItemsOptions = {}) {
	const {
		page = 1,
		limit = 10,
		status = 'all',
		search = '',
		sortBy = 'updatedAt',
		sortOrder = 'desc'
	} = options;

	let processedItems = [...dbItems];

	if (status !== 'all') {
		processedItems = processedItems.filter((item) => item.status === status);
	}

	if (search) {
		const query = search.toLowerCase();
		processedItems = processedItems.filter(
			(item) =>
				item.name.toLowerCase().includes(query) || item.owner.name.toLowerCase().includes(query)
		);
	}

	processedItems.sort((a, b) => {
		const valA = a[sortBy];
		const valB = b[sortBy];

		if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
		if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
		return 0;
	});

	const total = processedItems.length;
	const totalPages = Math.ceil(total / limit);
	const start = (page - 1) * limit;
	const end = start + limit;

	const paginatedItems = processedItems.slice(start, end);

	return {
		data: paginatedItems,
		meta: {
			total,
			page,
			limit,
			totalPages
		}
	};
}

export async function updateItem(id: string, updates: Partial<Item>) {
	const index = dbItems.findIndex((item) => item.id === id);

	if (index === -1) {
		throw new Error('Item not found');
	}

	dbItems[index] = {
		...dbItems[index],
		...updates,
		updatedAt: new Date().toISOString()
	};

	return dbItems[index];
}

export async function createItem(item: Item): Promise<Item> {
	dbItems.unshift(item);
	return item;
}
