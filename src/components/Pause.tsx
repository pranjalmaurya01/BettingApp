import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { buttonTextVariants, buttonVariants } from './Button';
import Receive from 'src/assets/images/receive.svg';
import Send from 'src/assets/images/send.svg';

export default function Pause({
	remaining_time,
	end_time,
	start_time,
}: {
	remaining_time: string;
	end_time: string;
	start_time: string;
}) {
	const rt = remaining_time.split(':');

	return (
		<ImageBackground
			source={require('src/assets/images/BG.jpg')}
			resizeMode='cover'
			className='w-full h-screen pause_bg_img flex flex-col text-white items-center '
		>
			<View className='flex-1' />
			<View>
				<View className='text-lg text-center'>
					<Text className='text-white text-xl text-center'>
						{start_time}
					</Text>
					<View className='flex flex-row h-10 my-3 items-center'>
						<View className='overflow-hidden rounded-md mr-1'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[0].charAt(0)}
								</Text>
							</BlurView>
						</View>
						<View className='overflow-hidden rounded-md'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[0].charAt(1)}
								</Text>
							</BlurView>
						</View>
						<View className='px-1'>
							<Text className='text-white text-3xl'>&#58;</Text>
						</View>
						<View className='overflow-hidden rounded-md mr-1'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[1].charAt(0)}
								</Text>
							</BlurView>
						</View>
						<View className='overflow-hidden rounded-md'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[1].charAt(1)}
								</Text>
							</BlurView>
						</View>
						<View className='px-1'>
							<Text className='text-white text-3xl'>&#58;</Text>
						</View>
						<View className='overflow-hidden rounded-md mr-1'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[2].charAt(0)}
								</Text>
							</BlurView>
						</View>
						<View className='overflow-hidden rounded-md'>
							<BlurView
								tint='light'
								intensity={40}
								className='flex justify-center items-center px-2 py-1'
							>
								<Text className='text-white text-3xl'>
									{rt[2].charAt(1)}
								</Text>
							</BlurView>
						</View>
					</View>
					<Text className='text-white text-xl text-center'>
						{end_time}
					</Text>
					<View className='flex flex-row justify-between px-1 mt-6'>
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
					</View>
				</View>
			</View>
			<View className='flex-[2]' />
		</ImageBackground>
	);
}
