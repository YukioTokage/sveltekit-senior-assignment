import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	// const session = cookies.get('session');

	// if (!session) {
	// 	const lang = getLocale();
	// 	const langPrefix = lang !== 'en' ? `/${lang}` : '';

	// 	const redirectTo = url.pathname;

	// 	throw redirect(302, `${langPrefix}/login?redirectTo=${redirectTo}`);
	// }

	return {
		// session: {
		// 	// TODO: Change on real parsing from users.json
		// 	user: { role: 'admin', email: 'admin@demo.test' }
		// }
	};
};
