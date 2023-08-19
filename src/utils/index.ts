import {router} from 'expo-router';
import {revokeJwt} from 'src/axios/jwt';

export async function logout() {
	await revokeJwt();
	router.push('/login/');
}
