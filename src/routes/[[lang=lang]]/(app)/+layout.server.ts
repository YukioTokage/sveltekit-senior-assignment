import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, params }) => {
	const session = cookies.get('session');

	if (!session) {
		const langPrefix = params.lang ? `/${params.lang}` : '';

		const redirectTo = url.pathname;

		redirect(302, `${langPrefix}/login?redirectTo=${redirectTo}`);
	}

	return {
		session: {
			// TODO: Change on real parsing from users.json
			user: { role: 'admin', email: 'admin@demo.test' }
		}
	};
};
