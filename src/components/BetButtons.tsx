import {BlurView} from 'expo-blur';
import {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {FlatGrid} from 'react-native-super-grid';
import request from 'src/axios/request';
import useUser from 'src/store/useUser';
import useWallet, {getWallet} from 'src/store/useWallet';
import useWs from 'src/store/useWs';
import {buttonTextVariants, buttonVariants} from './Button';
import EachButton from './EachButton';

const elementsToAdd: BetButtonsI[] = [
	{bet_number: -1, id: -1},
	{bet_number: -1, id: -1},
];

export default function BetButtons({
	remTime,
	bettingData,
}: {
	remTime: string;
	bettingData: BetButtonDataI;
}) {
	const {setAmt} = useWallet((state) => state);
	const buttonData = useWs((state) => state.buttonData);
	const user = useUser((state) => state.data);

	const [state, setState] = useState<{
		buttons: BetButtonsI[];
		selectedNumber: BetButtonsI | null;
	}>({
		selectedNumber: null,
		buttons: [],
	});

	const disableButton = remTime
		? +remTime.split(':')[0] === 0 && +remTime.split(':')[1] < 21
		: true;

	useEffect(() => {
		if (buttonData.length > 0 && buttonData.length < 11) {
			buttonData.splice(-1, 0, ...elementsToAdd);
		}
	}, [buttonData]);

	function resetSelected() {
		setState((prev) => ({
			...prev,
			selectedNumber: null,
		}));
		setForm((prev) => ({...prev, amount: ''}));
	}

	const [form, setForm] = useState<{
		amount: string;
		isLoading: boolean;
		errors: string[];
	}>({
		amount: '',
		isLoading: false,
		errors: [],
	});

	async function createBet() {
		setForm((prev) => ({
			...prev,
			isLoading: true,
		}));
		const {HttpStatusCode, status, data} = await request(
			'POST',
			'/bet/create/',
			{},
			{
				user_id: user?.id,
				number_id: state.selectedNumber?.id,
				bet_amount: +form.amount,
			}
		);

		if (status === HttpStatusCode.BAD_REQUEST && data) {
			setForm((prev) => ({
				...prev,
				errors: [data.error],
				isLoading: false,
			}));
			return;
		}
		if (status === HttpStatusCode.CREATED && data) {
			Toast.show(`${data.message}`, {
				duration: Toast.durations.SHORT,
			});
			if (!user) return;
			const money = await getWallet(user.id);
			if (money !== undefined) setAmt(money);
			resetSelected();
		}
		setForm((prev) => ({
			...prev,
			isLoading: false,
		}));
	}

	return (
		<View className='relative'>
			<FlatGrid
				itemDimension={10}
				maxItemsPerRow={4}
				data={buttonData}
				renderItem={({item, index}) =>
					item.bet_number !== -1 ? (
						<EachButton
							text={item.bet_number}
							disabled={disableButton}
							idx={index}
							tBetAmt={bettingData[item.bet_number]}
							onPress={() => {
								setState((prev) => ({
									...prev,
									selectedNumber: item,
								}));
							}}
						/>
					) : (
						<></>
					)
				}
			/>
			<View className='flex justify-center items-center mt-22'>
				<Modal
					transparent={true}
					visible={state.selectedNumber !== null}
					onRequestClose={() => {
						resetSelected();
					}}
				>
					<BlurView
						tint='light'
						intensity={100}
						style={{
							position: 'absolute',
							height: '100%',
							width: '100%',
						}}
					>
						<View className='flex-1 justify-center items-center'>
							<View className='bg-white w-[90vw] rounded-lg py-3 px-3'>
								<View>
									<Text className='text-center font-semibold text-lg'>
										You Selected -{' '}
										{state.selectedNumber?.bet_number}
									</Text>
									<Text className='text-center mt-2'>
										Enter the amount you want to bet
									</Text>
									<TextInput
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1'
										onChangeText={(e) =>
											setForm((prev) => ({
												...prev,
												amount: e,
											}))
										}
										value={form.amount}
									/>
									<TouchableOpacity
										disabled={form.isLoading}
										onPress={() => {
											createBet();
										}}
										className={`${buttonVariants.bet} bg-[#22c55e] mt-2`}
									>
										{form.isLoading && (
											<ActivityIndicator
												className='mr-2'
												color='white'
											/>
										)}
										<Text
											className={buttonTextVariants.bet}
										>
											Bet Now
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</BlurView>
				</Modal>
			</View>
		</View>
	);
}
