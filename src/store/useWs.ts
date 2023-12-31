import { WebSocketLike } from 'react-use-websocket/dist/lib/types';
import request from 'src/axios/request';
import { logout } from 'src/utils';
import { create } from 'zustand';

export async function getButtonData() {
	const { HttpStatusCode, status, data } = await request(
		'GET',
		'/bet/choice/'
	);
	if (status === HttpStatusCode.OK && data) {
		return data;
	}
	await logout();
	return null;
}

export interface WsI {
	timerData: timerDataI | undefined;
	setTimerData: (t: timerDataI) => void;
	setTimerWsConn: (data: WebSocketLike) => void;
	wsTimerConn: WebSocketLike | null;
	wsConnection: WebSocketLike | null;
	data: get_bet_numberI | undefined;
	buttonData: BetButtonsI[];
	setButtonData: (data: BetButtonsI[]) => void;
	setData: (data: get_bet_numberI) => void;
	setWsConnection: (data: WebSocketLike) => void;
}

const useWs = create<WsI>((set) => ({
	timerData: undefined,
	setTimerData: (t) =>
		set((state) => ({
			...state,
			timerData: t,
		})),
	setTimerWsConn: (ws) =>
		set((state) => ({
			...state,
			wsTimerConn: ws,
		})),
	wsTimerConn: null,
	wsConnection: null,
	setWsConnection: (ws) =>
		set((state) => ({
			...state,
			wsConnection: ws,
		})),
	data: undefined,
	buttonData: [],
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
