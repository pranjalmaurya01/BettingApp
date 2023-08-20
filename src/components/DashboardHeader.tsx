import {Link} from 'expo-router';
import {useEffect} from 'react';
import {
	ActivityIndicator,
	Image,
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
						<Link href='/dashboard/rules' asChild>
							<TouchableOpacity
								className={`${buttonVariants.whiteHeader}`}
							>
								<Rules className='mr-1' />
								<Text
									className={`${buttonTextVariants.whiteHeader}`}
								>
									Rules
								</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</View>
			<View className='bg-[#FFF879]/70 h-4 -mt-2 rounded-b-full w-[90%] mx-auto' />
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
