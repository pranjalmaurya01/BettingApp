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
		setRefreshing(true);
	};

	useEffect(() => {
		if (wsConnection && wsConnection.OPEN && refreshing) {
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
		<>
			<DashboardHeader remTime={wsData.remaining_time} />
			<StopWatch />
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			<IdCountdown remTime={wsData.remaining_time} />
			<BetButtons
				remTime={wsData.remaining_time}
				bettingData={wsData.bettingButtonData}
			/>
		</>
	);
}
