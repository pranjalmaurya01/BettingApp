import {useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import useWs from 'src/store/useWs';
import EachButton from './EachButton';

// {
// 	// remTime,
// }: // bettingData,
// {
// 	// remTime: string;
// 	// bettingData: BetButtonDataI;
// }

const elementsToAdd: BetButtonsI[] = [
	{bet_number: -1, id: -1},
	{bet_number: -1, id: -1},
];

export default function BetButtons() {
	// const {setAmt} = useWallet((state) => state);
	const buttonData = useWs((state) => state.buttonData);
	// const user = useUser((state) => state.data);

	// const disableButton = remTime
	// 	? +remTime.split(':')[0] === 0 && +remTime.split(':')[1] < 21
	// 	: true;

	useEffect(() => {
		if (buttonData.length > 0 && buttonData.length < 11) {
			buttonData.splice(-1, 0, ...elementsToAdd);
		}
	}, [buttonData]);

	return (
		<>
			<FlatGrid
				itemDimension={10}
				maxItemsPerRow={4}
				data={buttonData}
				renderItem={({item, index}) =>
					item.bet_number !== -1 ? (
						<EachButton
							text={item.bet_number}
							// disabled={disableButton}
							idx={index}
							// tBetAmt={bettingData[item.bet_number]}
							onPress={() => {
								console.log('pressed', index);
							}}
						/>
					) : (
						<></>
					)
				}
			/>
		</>
	);
}
