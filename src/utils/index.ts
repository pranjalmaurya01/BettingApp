import {clsx, type ClassValue} from 'clsx';
import {router} from 'expo-router';
import {revokeJwt} from 'src/axios/jwt';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function logout() {
	await revokeJwt();
	router.push('/login/');
}
