import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import usersData from '$lib/server/mocks/users.json';
import { usersFileSchema } from '$lib/schemas';
import { getLocale } from '$lib/paraglide/runtime.js';

const loginFormSchema = z.object({
	email: z.email('Invalid email format'),
	password: z.string().min(1, 'Password is required')
});

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('session')) {
		const lang = getLocale();
		const langPrefix = lang !== 'en' ? `/${lang}` : '';

		throw redirect(303, `${langPrefix}/dashboard`);
	}
	return {};
};

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const parsedForm = loginFormSchema.safeParse({ email, password });
		if (!parsedForm.success) {
			return fail(400, {
				error: parsedForm.error.issues[0].message,
				email: email?.toString()
			});
		}

		const parsedUsers = usersFileSchema.safeParse(usersData);
		if (!parsedUsers.success) {
			return fail(500, { error: 'Internal Database Error' });
		}

		const user = parsedUsers.data.find(
			(u) => u.email === parsedForm.data.email && u.password === parsedForm.data.password
		);

		if (!user) {
			return fail(401, {
				error: 'Invalid email or password',
				email: parsedForm.data.email
			});
		}

		const sessionPayload = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role
		};

		cookies.set('session', JSON.stringify(sessionPayload), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24
		});

		const redirectTo = url.searchParams.get('redirectTo');
		const lang = getLocale();
		const prefix = lang === 'en' ? '' : `/${lang}`;

		if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
			throw redirect(303, redirectTo);
		}

		throw redirect(303, `${prefix}/dashboard`);
	},

	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });

		const lang = getLocale();
		const langPrefix = lang !== 'en' ? `/${lang}` : '';

		throw redirect(303, `${langPrefix}/login`);
	}
};
