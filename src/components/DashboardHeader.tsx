import {AntDesign} from '@expo/vector-icons';
import {BlurView} from 'expo-blur';
import {Link} from 'expo-router';
import {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Contact from 'src/assets/images/contact.svg';
import Logo from 'src/assets/images/logo.svg';
import Receive from 'src/assets/images/receive.svg';
import Rules from 'src/assets/images/rules.svg';
import Send from 'src/assets/images/send.svg';
import StopWatchIcon from 'src/assets/images/stopwatch.svg';
import StopwatchIcon from 'src/assets/images/stopwatchl.svg';
import UserIcon from 'src/assets/images/user-vector.svg';
import getBaseUrl from 'src/axios/baseUrl';
import useUser from 'src/store/useUser';
import useWallet, {getWallet} from 'src/store/useWallet';
import {buttonTextVariants, buttonVariants} from './Button';

export default function DashboardHeader({remTime}: {remTime: string}) {
	return (
		<View className='bg-brand p-3 text-white rounded-b-2xl pb-4 md:pb-6'>
			<Upper />
			<Lower remTime={remTime} />
		</View>
	);
}

function Lower({remTime}: {remTime: string}) {
	const user = useUser((store) => store.data);
	const [showRules, setShowRules] = useState(false);
	const {amt, setAmt} = useWallet((state) => state);

	const setWalletData = async () => {
		if (!user) return;
		const money = await getWallet(user.id);
		if (money !== undefined) setAmt(money);
	};

	const splitRemTime = remTime.split(':');
	const rerender = splitRemTime[0] === '0' && splitRemTime[1] === '00';

	useEffect(() => {
		if (rerender) setWalletData();
	}, [rerender]);

	useEffect(() => {
		setWalletData();
	}, []);

	return (
		<>
			<View
				className='
			flex flex-col bg-[#FFF879] text-black h-32 md:h-36 justify-center rounded-2xl shadow-lg'
			>
				<View className='mb-5'></View>
				<View>
					<View className='flex flex-col items-center'>
						<Text className='text-lg '>Your Balance</Text>
						<Text className='font-bold text-2xl'>
							{amt === undefined ? (
								<ActivityIndicator className='mr-2 h-4 w-4 animate-spin' />
							) : (
								amt
							)}
						</Text>
					</View>
					<View className='flex flex-row justify-between px-3 pb-6 md:pb-0 pt-2'>
						<Link href='/recharge' asChild>
							<TouchableOpacity
								className={`${buttonVariants.greenHeader}`}
							>
								<Send className='mr-1' />
								<Text
									className={`${buttonTextVariants.greenHeader}`}
								>
									Recharge
								</Text>
							</TouchableOpacity>
						</Link>
						<Link href='/withdraw' asChild>
							<TouchableOpacity
								className={`${buttonVariants.whiteHeader}`}
							>
								<Receive className='mr-1' />
								<Text
									className={`${buttonTextVariants.whiteHeader}`}
								>
									Withdraw
								</Text>
							</TouchableOpacity>
						</Link>
						<TouchableOpacity
							onPress={() => {
								setShowRules(true);
							}}
							className={`${buttonVariants.whiteHeader}`}
						>
							<Rules className='mr-1' />
							<Text
								className={`${buttonTextVariants.whiteHeader}`}
							>
								Rules
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className='bg-[#FFF879]/70 h-4 -mt-2 rounded-b-full w-[90%] mx-auto' />
			<View className='flex justify-center items-center mt-22'>
				<Modal
					transparent={true}
					visible={showRules}
					onRequestClose={() => {
						setShowRules(false);
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
								<View className='flex flex-row items-center justify-between py-2'>
									<View />
									<Text className='text-center font-semibold text-lg'>
										Game Rules
									</Text>
									<TouchableOpacity
										className='p-1'
										onPress={() => {
											setShowRules(false);
										}}
									>
										<AntDesign
											name='closecircleo'
											size={20}
											color='gray'
										/>
									</TouchableOpacity>
								</View>
								<View className='border-t-2 border-gray-300'>
									<FlatList
										contentContainerStyle={{padding: 10}}
										data={[
											{
												key: 'USERS CAN CHOOSE AND BET ON ANY NUMBERS AMONG 10 NUMBERS GIVEN.',
											},
											{
												key: 'THERE WILL BE 5 WINNING NUMBERS EVERY TIME AMONG OF THOSE 10 NUMBERS.',
											},
											{
												key: 'WINNING NUMBERS WILL BE THOSE WITH THE LOWEST BETTING AMOUNTS.',
											},
											{
												key: 'USERS WITH WINNING BETS WILL WIN 2X AMOUNT ON THEIR BETS.',
											},
										]}
										renderItem={({item, index}) => {
											return (
												<View className='mb-2 flex flex-row'>
													<Text className='font-semibold text-sm'>
														{index + 1}.{' '}
													</Text>
													<Text className='text-md'>
														{item.key}
													</Text>
												</View>
											);
										}}
									/>
								</View>
							</View>
						</View>
					</BlurView>
				</Modal>
			</View>
		</>
	);
}

function Upper() {
	const user = useUser((store) => store.data);
	if (!user) return;

	return (
		<View className='flex flex-row items-center justify-between px-1'>
			<View>
				<Link href='/profile'>
					<View className='rounded-full border-white border-[1px]'>
						{user.profile_picture ? (
							<Image
								className='h-8 w-8 rounded-full'
								source={{
									uri: getBaseUrl() + user.profile_picture,
								}}
							/>
						) : (
							<Image
								source={require('src/assets/images/profile.jpg')}
								className='h-8 w-8 rounded-full'
							/>
						)}
					</View>
				</Link>
			</View>
			<Logo className='h-16 md:h-20' />
			<Link href='/support' className='p-1 rounded-full bg-white/30'>
				<Contact className='h-7' />
			</Link>
		</View>
	);
}

export function StopWatch() {
	return (
		<View className='mt-3 flex flex-row justify-center items-center mx-6'>
			<StopWatchIcon className='h-6' />
			<Text className='ml-2 text-lg font-semibold'>03:00</Text>
		</View>
	);
}

export function IdCountdown({remTime}: {remTime: string}) {
	return (
		<View className='m-5'>
			<View className='flex flex-row justify-between'>
				<View className='flex items-center flex-row'>
					<UserIcon className='h-5' />
					<Text className='ml-2 text-gray-500'>ID</Text>
				</View>
				<View className='flex items-center flex-row'>
					<StopwatchIcon className='h-5' />
					<Text className='ml-2 text-gray-500'>Count Down</Text>
				</View>
			</View>
			<View className='flex flex-row justify-between mt-2 text-lg'>
				<Text className='text-gray-700'>123456</Text>
				<Text className='text-gray-700'>{remTime}</Text>
			</View>
		</View>
	);
}
