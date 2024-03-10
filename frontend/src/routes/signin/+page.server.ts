import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const response = await fetch('http://localhost:8000/v1/users/login', {
			headers: {
				Email: email,
				Password: password
			}
		});
		const responseData = await response.json();
		if (response.ok) {
			cookies.set('sessionId', responseData.api_key, {
				path: '/',
				secure: true,
				sameSite: 'lax',
				maxAge: 3600
			});
			throw redirect(301, '/me');
		} else {
			return {
				error: responseData.error
			};
		}
	}
};
