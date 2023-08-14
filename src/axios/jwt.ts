export interface tokenI {
	access: string;
	refresh: string;
}

export function getJwt(): tokenI | null {
	const access = localStorage.getItem('access');
	const refresh = localStorage.getItem('refresh');
	if (access && refresh) return {access, refresh};
	return null;
}

export function setJwt({access, refresh}: tokenI) {
	localStorage.setItem('access', access);
	localStorage.setItem('refresh', refresh);
}

export function revokeJwt() {
	localStorage.clear();
}
