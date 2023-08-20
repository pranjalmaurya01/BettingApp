import BetButtons from 'src/components/BetButtons';

import DashboardHeader, {
	IdCountdown,
	StopWatch,
} from 'src/components/DashboardHeader';
import useWs from 'src/store/useWs';

export default function Dashboard() {
	const wsData = useWs((state) => state.data);

	if (!wsData) {
		return <StopWatch />;
	}

	return (
		<>
			<DashboardHeader remTime={wsData.remaining_time} />
			<StopWatch />
			<IdCountdown remTime={wsData.remaining_time} />
			<BetButtons
				remTime={wsData.remaining_time}
				bettingData={wsData.bettingButtonData}
			/>
		</>
	);
}
