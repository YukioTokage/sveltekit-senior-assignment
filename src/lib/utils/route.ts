// src/lib/i18n.ts
import { resolve } from '$app/paths';
import type { Pathname, PathnameWithSearchOrHash } from '$app/types';
import { localizeHref } from '$lib/paraglide/runtime';

export function localizedResolve(path: string, opts?: Parameters<typeof localizeHref>[1]) {
	return resolve(localizeHref(path, opts) as Pathname);
}

export function localizedResolveWithSearchOrHash(
	path: string,
	opts?: Parameters<typeof localizeHref>[1]
) {
	return resolve(localizeHref(path, opts) as PathnameWithSearchOrHash);
}
