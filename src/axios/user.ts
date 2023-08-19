import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDataI} from 'src/store/useUser';

const key = 'user_data';

export async function getUserAsyncStorage() {
	const userDataS = await AsyncStorage.getItem(key);
	if (userDataS) {
		const tokens = JSON.parse(userDataS) as UserDataI;
		return tokens;
	}
	return null;
}

export async function setUserAsyncStorage({...e}: UserDataI) {
	try {
		const authKeys = JSON.stringify({...e});
		await AsyncStorage.setItem(key, authKeys);
	} catch (e) {
		console.log(e);
	}
}
