declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

type BetButtonDataI = Record<number, number>;

interface number_countsI {
	bet_number: number;
	count: number;
	total_bet_amount: number;
}

interface get_bet_numberI {
	number_counts: number_countsI[];
	remaining_time: string;
	type: 'get_bet_number';
	bettingButtonData: BetButtonDataI;
}

interface BetButtonsI {
	id: number;
	bet_number: number;
}
