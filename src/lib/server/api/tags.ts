import rawTags from '$lib/server/mocks/tags.json';
import { tagsFileSchema } from '$lib/schemas';

const tagsArray = tagsFileSchema.parse(rawTags);

export const tagsMap = tagsArray.reduce(
	(acc, tag) => {
		acc[tag.slug] = tag.label;
		return acc;
	},
	{} as Record<string, Record<string, string>>
);
