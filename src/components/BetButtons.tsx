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
		global: boolean;
		globalAmt: string;
	}>({
		global: false,
		globalAmt: '',
		amount: '',
		isLoading: false,
		errors: [],
	});

	async function createBet(numberId?: number) {
		setForm((prev) => ({
			...prev,
			isLoading: true,
		}));
		let bet_amount = 0;
		let number_id = null;
		if (form.global) {
			bet_amount = +form.globalAmt;
			number_id = numberId;
		} else {
			bet_amount = +form.amount;
			number_id = state.selectedNumber?.id;
		}
		const {HttpStatusCode, status, data} = await request(
			'POST',
			'/bet/create/',
			{},
			{
				user_id: user?.id,
				number_id,
				bet_amount,
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

	function onEachButtonPress({item}: {item: BetButtonsI}) {
		if (form.global) {
			createBet(item.id);
			return;
		}
		setState((prev) => ({
			...prev,
			selectedNumber: item,
		}));
	}

	return (
		<View className='relative'>
			<View className='flex flex-row flex-wrap px-1'>
				{buttonData.map((item, index) => {
					return item.bet_number !== -1 ? (
						<View className='w-[25%] p-1' key={index}>
							<EachButton
								text={item.bet_number}
								disabled={disableButton}
								idx={index}
								tBetAmt={bettingData[item.bet_number]}
								onPress={() => {
									onEachButtonPress({item});
								}}
							/>
						</View>
					) : (
						<View key={index} className='w-[25%] p-1' />
					);
				})}
			</View>
			<View className='mx-1 mt-3 flex flex-row items-center justify-center'>
				<TextInput
					editable={form.global}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 mx-1 flex-1'
					placeholder='Amount'
					onChangeText={(e) => {
						setForm((prev) => ({...prev, globalAmt: e}));
					}}
					value={form.globalAmt}
				/>
				<TouchableOpacity
					disabled={form.global}
					className={`${buttonVariants.start} mr-1 ${
						form.global && 'opacity-80'
					}`}
					onPress={() => {
						setForm((prev) => ({...prev, global: true}));
					}}
				>
					<Text className={buttonTextVariants.bet}>START</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={!form.global}
					className={`${buttonVariants.stop} ${
						!form.global && 'opacity-80'
					}`}
					onPress={() => {
						setForm((prev) => ({...prev, global: false}));
					}}
				>
					<Text className={buttonTextVariants.stop}>STOP</Text>
				</TouchableOpacity>
			</View>
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
