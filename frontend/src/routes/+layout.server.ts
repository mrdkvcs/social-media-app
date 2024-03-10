export const load = async (event) => {
	const sessionId = event.cookies.get('sessionId');
	if (sessionId) {
		const response = await fetch('http://localhost:8000/v1/users', {
			headers: {
				Authorization: `ApiKey ${sessionId}`
			}
		});
		const responseData = await response.json();
		return {
			state: {
				loggedIn: true
			},
			initials: `${responseData.firstName[0]}${responseData.lastName[0]}`
		};
	} else {
		return {
			state: {
				loggedIn: false
			},
			initials: '?'
		};
	}
};
