import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

const formSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8),
	username: z.string().min(1)
});
export const load = async (event) => {
	const form = await superValidate(zod(formSchema));
	return {
		form
	};
};
export const actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const body = JSON.stringify({
			firstName: form.data.firstName,
			lastName: form.data.lastName,
			email: form.data.email,
			password: form.data.password,
			username: form.data.username
		});
		const response = await fetch('http://localhost:8000/v1/users', {
			method: 'POST',
			body
		});
		if (response.ok) {
			const user = await response.json();
			event.cookies.set('sessionId', user.api_key, {
				secure: true,
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 1800
			});
			throw redirect(301, '/me');
		}
	}
};
