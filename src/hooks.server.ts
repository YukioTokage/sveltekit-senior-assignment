import type { Handle, Reroute } from '@sveltejs/kit';
import { getTextDirection, deLocalizeUrl } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

export const handle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};

export const reroute: Reroute = ({ url }) => {
	return deLocalizeUrl(url).pathname;
};
