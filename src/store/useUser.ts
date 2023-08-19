import request from 'src/axios/request';
import {setUserAsyncStorage} from 'src/axios/user';
import {logout} from 'src/utils';
import {create} from 'zustand';

export async function getUserData() {
	const {HttpStatusCode, status, data} = await request(
		'GET',
		'/account/profile/'
	);
	if (status === HttpStatusCode.OK && data) {
		return data;
	}
	await logout();
	return null;
}

const useUser = create<UserI>((set) => ({
	data: null,
	setData: ({...e}) => {
		setUserAsyncStorage(e);
		return set((state) => ({
			...state,
			data: {
				...e,
			},
		}));
	},
}));

export default useUser;

export interface UserDataI {
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	phone_no: string;
	profile_picture: string;
	refral_code: string;
	refral_wallet: number;
	referral_count: number;
}

export interface UserI {
	data: UserDataI | null;
	setData: ({
		email,
		first_name,
		id,
		last_name,
		phone_no,
		profile_picture,
		refral_code,
		refral_wallet,
		referral_count,
	}: UserDataI) => void;
}
