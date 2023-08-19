import {AntDesign, Entypo, EvilIcons} from '@expo/vector-icons';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {buttonVariants} from './Button';

export default function Transaction() {
	return (
		<View className='m-2'>
			<View className='w-full h-12 relative'>
				<TextInput
					className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 px-10'
					placeholder='Search'
				/>
				<View className='absolute left-3 top-3'>
					<EvilIcons name='search' size={24} color='black' />
				</View>
				<View className='absolute right-3 top-3'>
					<Entypo name='sound-mix' size={24} color='black' />
				</View>
			</View>
			<View>
				<View className='mt-4 bg-[#0D6EFD] flex flex-row justify-around py-3 rounded-t-2xl '>
					<Text className='text-white text-sm'>Date</Text>
					<Text className='text-white text-sm'>Particulars</Text>
					<Text className='text-white text-sm'>Amount</Text>
				</View>
				<View>
					<View className='text-gray-600 font-semibold'>
						{Array.from(Array(10).keys()).map((e) => (
							<View
								key={e}
								className='flex flex-row justify-around pt-3 text-sm'
							>
								<Text>12/06/2023</Text>
								<Text>Lorem ipsum</Text>
								<Text>+120</Text>
							</View>
						))}
					</View>
				</View>
				<View className='flex flex-row justify-between mt-8 mx-4 items-center'>
					<TouchableOpacity className={buttonVariants.prev}>
						<AntDesign name='caretleft' size={20} color='white' />
					</TouchableOpacity>
					<TouchableOpacity className={buttonVariants.prev}>
						<AntDesign name='caretright' size={20} color='white' />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
