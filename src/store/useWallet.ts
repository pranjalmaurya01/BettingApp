import request from 'src/axios/request';
import {create} from 'zustand';

export async function getWallet(id: number) {
	const {HttpStatusCode, status, data} = await request(
		'GET',
		`/bet/totalamount/${id}/`
	);
	if (status === HttpStatusCode.OK && data) {
		return data.amount;
	}
	return null;
}

export interface WalletI {
	amt: number | undefined;
	setAmt: (amt: number) => void;
}

const useWallet = create<WalletI>((set) => ({
	amt: undefined,
	setAmt: (amount) =>
		set((state) => ({
			...state,
			amt: amount,
		})),
}));

export default useWallet;
