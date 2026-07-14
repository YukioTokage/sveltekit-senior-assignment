import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	email: z.email({ error: 'Invalid email format' }),
	password: z.string(),
	name: z.string(),
	role: z.enum(['admin', 'editor', 'viewer'])
});

export const itemSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	status: z.enum(['draft', 'scheduled', 'active', 'paused', 'completed', 'archived']),
	channel: z.enum(['email', 'sms', 'web', 'social', 'push']),
	owner: z.object({
		id: z.string(),
		name: z.string()
	}),
	budget: z.number().nonnegative(),
	spent: z.number().nonnegative(),
	impressions: z.number().nonnegative(),
	clicks: z.number().nonnegative(),
	ctr: z.number().min(0).max(1),
	startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
	endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
	updatedAt: z.iso.datetime({ error: 'Must be a valid ISO 8601 date' }),
	tags: z.array(z.string())
});

export const postSchema = z.object({
	id: z.string(),
	slug: z.string(),
	translations: z.record(
		z.string(),
		z.object({
			title: z.string(),
			excerpt: z.string(),
			body: z.string()
		})
	),
	tags: z.array(z.string()),
	author: z.object({
		id: z.string(),
		name: z.string(),
		avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { error: 'Must be a valid hex color' })
	}),
	publishedAt: z.iso.datetime({ error: 'Must be a valid ISO 8601 date' }),
	readingTimeMinutes: z.number().positive(),
	coverColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { error: 'Must be a valid hex color' })
});

export const tagSchema = z.object({
	slug: z.string(),
	label: z.record(z.string(), z.string())
});

export type User = z.infer<typeof userSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Post = z.infer<typeof postSchema>;
export type Tag = z.infer<typeof tagSchema>;

export type LocalizedPost = Omit<Post, 'translations'> & {
	title: string;
	excerpt: string;
	body?: string;
};

export const usersFileSchema = z.array(userSchema);
export const itemsFileSchema = z.array(itemSchema);
export const postsFileSchema = z.array(postSchema);
export const tagsFileSchema = z.array(tagSchema);
