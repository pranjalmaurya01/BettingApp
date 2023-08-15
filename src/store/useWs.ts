import request from 'src/axios/request';
import {logout} from 'src/utils';
import {create} from 'zustand';

export async function getButtonData() {
	const {HttpStatusCode, status, data} = await request('GET', '/bet/choice/');
	if (status === HttpStatusCode.OK && data) {
		return data;
	}
	await logout();
	return null;
}

export interface WsI {
	data: unknown;
	buttonData: BetButtonsI[] | undefined;
	setButtonData: (data: BetButtonsI[]) => void;
	setData: (data: number) => void;
}

const useWs = create<WsI>((set) => ({
	data: undefined,
	buttonData: undefined,
	setButtonData: (data) =>
		set((state) => ({
			...state,
			buttonData: data,
		})),
	setData: (data) =>
		set((state) => ({
			...state,
			data,
		})),
}));

export default useWs;
