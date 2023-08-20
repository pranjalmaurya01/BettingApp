import {useState} from 'react';
import BetButtons from 'src/components/BetButtons';

import DashboardHeader, {
	IdCountdown,
	StopWatch,
} from 'src/components/DashboardHeader';
import useWs from 'src/store/useWs';

export default function Dashboard() {
	const wsData = useWs((state) => state.data);

	const [state, setState] = useState<{
		data: get_bet_numberI;
		isLoading: boolean;
	}>({
		data: {
			number_counts: [],
			remaining_time: '',
			type: 'get_bet_number',
			bettingButtonData: {},
		},
		isLoading: false,
	});

	if (!wsData) {
		// return <StopWatch />;
		return (
			<BetButtons
			// remTime={wsData.remaining_time}
			// bettingData={wsData.bettingButtonData}
			/>
		);
	}

	return (
		<>
			<DashboardHeader remTime={wsData.remaining_time} />
			<StopWatch />
			<IdCountdown remTime={wsData.remaining_time} />
			<BetButtons />
		</>
	);
}
