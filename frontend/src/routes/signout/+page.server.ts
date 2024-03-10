import { redirect } from '@sveltejs/kit';
export const load = async (event) => {
	event.cookies.set('sessionId', '', {
		path: '/'
	});
	throw redirect(301, '/signin');
};
