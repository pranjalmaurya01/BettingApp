import {useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import BetButtons from 'src/components/BetButtons';

import DashboardHeader, {
	IdCountdown,
	StopWatch,
} from 'src/components/DashboardHeader';
import useWs from 'src/store/useWs';

export default function Dashboard() {
	const wsData = useWs((state) => state.data);
	const wsConnection = useWs((state) => state.wsConnection);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		if (wsConnection && !wsConnection.OPEN) setRefreshing(true);
	};

	useEffect(() => {
		if (refreshing && wsConnection && wsConnection.OPEN) {
			setRefreshing(false);
		}
	}, [wsConnection]);

	if (!wsData) {
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
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
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
