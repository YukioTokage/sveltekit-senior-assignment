import { locales } from '$lib/paraglide/runtime';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return param === '' || locales.some((locale) => locale === param);
};
