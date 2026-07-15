import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';
import type { User } from '$lib/schemas';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('session');

	if (!session) {
		redirectToLogin(url.pathname);
	}

	try {
		const user: Omit<User, 'password'> = JSON.parse(session);

		return {
			session: {
				user
			}
		};
	} catch {
		cookies.delete('session', { path: '/' });
		redirectToLogin(url.pathname);
	}
};

function redirectToLogin(pathname: string): never {
	const lang = getLocale();
	const langPrefix = lang !== 'en' ? `/${lang}` : '';

	const redirectTo = pathname;

	throw redirect(302, `${langPrefix}/login?redirectTo=${redirectTo}`);
}
