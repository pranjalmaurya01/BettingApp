import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import BetButtons from 'src/components/BetButtons';

import DashboardHeader, {
	IdCountdown,
	StopWatch,
} from 'src/components/DashboardHeader';
import Pause from 'src/components/Pause';
import useWs from 'src/store/useWs';

export default function Dashboard() {
	const wsData = useWs((state) => state.data);
	const wsConnection = useWs((state) => state.wsConnection);
	const timerData = useWs((state) => state.timerData);
	const wsTimerConn = useWs((state) => state.wsTimerConn);

	const [refreshing, setRefreshing] = useState({ data: false, timer: false });

	useEffect(() => {
		if (refreshing && wsConnection && wsConnection.OPEN) {
			setRefreshing((prev) => ({
				...prev,
				data: false,
			}));
		}
	}, [wsConnection]);

	useEffect(() => {
		if (refreshing.timer && wsTimerConn && wsTimerConn.OPEN) {
			setRefreshing((prev) => ({
				...prev,
				timer: false,
			}));
		}
	}, [wsTimerConn]);

	if (!timerData) {
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing.timer}
						onRefresh={() => {
							if (wsTimerConn && !wsTimerConn.OPEN) {
								setRefreshing((prev) => ({
									...prev,
									timer: true,
								}));
								wsTimerConn.close();
							}
						}}
					/>
				}
			>
				<StopWatch />
			</ScrollView>
		);
	}

	if (timerData.status) {
		return <Pause {...timerData} />;
	}

	if (!wsData) {
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing.timer}
						onRefresh={() => {
							if (wsConnection && !wsConnection.OPEN) {
								wsConnection.close();
								setRefreshing((prev) => ({
									...prev,
									data: true,
								}));
							}
						}}
					/>
				}
			>
				<StopWatch />
			</ScrollView>
		);
	}

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing.timer}
					onRefresh={() => {
						if (wsConnection && !wsConnection.OPEN) {
							wsConnection.close();
							setRefreshing((prev) => ({
								...prev,
								data: true,
							}));
						}
					}}
				/>
			}
		>
			<DashboardHeader remTime={wsData.remaining_time} />
			<StopWatch />
			<IdCountdown remTime={wsData.remaining_time} />
			<BetButtons
				remTime={wsData.remaining_time}
				bettingData={wsData.bettingButtonData}
			/>
		</ScrollView>
	);
}
