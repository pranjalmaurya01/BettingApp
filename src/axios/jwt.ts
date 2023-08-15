import AsyncStorage from '@react-native-async-storage/async-storage';

export interface tokenI {
	access: string;
	refresh: string;
}

export async function getJwt() {
	const authKeys = await AsyncStorage.getItem('auth');
	if (authKeys) {
		const tokens = JSON.parse(authKeys) as tokenI;
		return tokens;
	}
	return null;
}

export async function setJwt({access, refresh}: tokenI) {
	try {
		const authKeys = JSON.stringify({access, refresh});
		await AsyncStorage.setItem('auth', authKeys);
	} catch (e) {
		console.log(e);
	}
}

export async function revokeJwt() {
	await AsyncStorage.clear();
}
