import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { domain } from 'src/axios/baseUrl';
import { getUserAsyncStorage } from 'src/axios/user';
import useUser, { getUserData } from 'src/store/useUser';
import useWs, { getButtonData } from 'src/store/useWs';
import { logout } from 'src/utils';

export default function User({
	updateIsLoading,
}: {
	updateIsLoading: () => void;
}) {
	const setData = useUser((state) => state.setData);
	const user = useUser((state) => state.data);
	const setButtonData = useWs((state) => state.setButtonData);
	const setWS = useWs((state) => state.setData);
	const setWsConnection = useWs((state) => state.setWsConnection);
	const setTimerWsConn = useWs((state) => state.setTimerWsConn);
	const setTimerData = useWs((state) => state.setTimerData);
	const timerData = useWs((state) => state.timerData);

	useEffect(() => {
		(async () => {
			const userDataS = await getUserAsyncStorage();
			if (userDataS) {
				setData(userDataS);
				updateIsLoading();
			}
			const data = await Promise.all([getUserData(), getButtonData()]);
			if (data[0] && data[1]) {
				setData(data[0]);
				setButtonData(data[1]);
				updateIsLoading();
			} else {
				logout();
			}
		})();
	}, []);

	const { sendJsonMessage, getWebSocket } = useWebSocket(
		user && timerData && timerData.status === false
			? `wss://${domain}/ws/winning/`
			: null,
		{
			shouldReconnect: () => true,
			onOpen: () => {
				const connection = getWebSocket();
				if (connection) {
					setWsConnection(connection);
				}
				sendJsonMessage({
					action: 'get_bet_number',
				});
			},
			onClose: () => {
				console.log('Disconnected!');
			},
			// onMessage handler
			onMessage: (e: any) => {
				const data = JSON.parse(e.data);
				// console.log(data.remaining_time);
				switch (data.type) {
					case 'get_bet_number':
						// eslint-disable-next-line no-case-declarations
						const obj: BetButtonDataI = {};
						data.number_counts.forEach((e: number_countsI) => {
							obj[e.bet_number] = e.total_bet_amount;
						});
						data.bettingButtonData = obj;
						setWS(data);
						break;
					default:
						break;
				}
			},
		}
	);

	const { sendJsonMessage: sendMessage, getWebSocket: getWS } = useWebSocket(
		`wss://${domain}/ws/winning/`,
		{
			shouldReconnect: () => true,
			onOpen: () => {
				const connection = getWS();
				if (connection) {
					setTimerWsConn(connection);
				}
				sendMessage({
					action: 'get_timer',
				});
			},
			onClose: () => {
				console.log('Disconnected!');
			},
			// onMessage handler
			onMessage: (e: any) => {
				const data = JSON.parse(e.data);
				setTimerData(data);
			},
		}
	);

	return null;
}
