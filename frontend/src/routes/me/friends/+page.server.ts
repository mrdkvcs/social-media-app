import { redirect } from '@sveltejs/kit';
export const load = async ({ cookies, request }) => {
	const sessionId = cookies.get('sessionId');
	if (!sessionId) {
		throw redirect(301, '/signin');
	}
	const response = await fetch('http://localhost:8000/v1/me/friendrequests', {
		headers: {
			Authorization: `Apikey ${sessionId}`
		}
	});
	const friendRequests = await response.json();
	return {
		friendRequests
	};
};

export const actions = {
	acceptfriend: async ({ request, cookies }) => {
		const data = await request.formData();
		const sender_id = data.get('sender_id');
		const recipient_id = data.get('recipient_id');
		const body = JSON.stringify({ sender_id, recipient_id });
		const response = await fetch('http://localhost:8000/v1/friendships', {
			method: 'POST',
			body
		});
		if (response.ok) {
			return {
				success: true,
				message: 'Friend request accepted'
			};
		} else {
			return {
				success: false,
				message: 'Error while accepting friend request'
			};
		}
	}
};
