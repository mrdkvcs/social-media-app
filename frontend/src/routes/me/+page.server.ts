import { redirect } from '@sveltejs/kit';
export const load = async (event) => {
	const sessionId = event.cookies.get('sessionId');
	if (!sessionId) {
		throw redirect(301, '/signin');
	}
	const userResponse = await fetch('http://localhost:8000/v1/users', {
		headers: {
			Authorization: `ApiKey ${sessionId}`
		}
	});
	const user = await userResponse.json();
	const feedsResponse = await fetch('http://localhost:8000/v1/feeds');
	const feeds = await feedsResponse.json();
	return {
		props: {
			user,
			feeds
		}
	};
};

export const actions = {
	createfeed: async ({ cookies, request }) => {
		const sessionId = cookies.get('sessionId');
		const data = await request.formData();
		const content = data.get('content');
		const username = data.get('username');
		const body = JSON.stringify({ content, username });
		const response = await fetch('http://localhost:8000/v1/feeds', {
			method: 'POST',
			body,
			headers: {
				Authorization: `ApiKey ${sessionId}`
			}
		});
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const response = await fetch('http://localhost:8000/v1/feeds', {
			method: 'DELETE',
			headers: {
				id
			}
		});
	},
	likefeed: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const liked = data.get('liked');
		const response = await fetch('http://localhost:8000/v1/feeds', {
			method: 'PUT',
			headers: {
				id,
				liked
			}
		});
	},
	friendrequest: async ({ cookies, request }) => {
		const data = await request.formData();
		const senderId = data.get('senderID');
		const senderName = data.get('senderName');
		const recipientId = data.get('recipientID');
		const recipientName = data.get('recipientName');
		const response = await fetch('http://localhost:8000/v1/friendrequests', {
			method: 'POST',
			body: JSON.stringify({ senderId, senderName, recipientId, recipientName })
		});
		if (response.ok) {
			return {
				success: true,
				message: 'Friend request sent',
				name: recipientName
			};
		} else {
			return {
				success: false,
				message: 'Error sending friend request',
				name: recipientName
			};
		}
	}
};
