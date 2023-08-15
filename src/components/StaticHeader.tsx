import {AntDesign} from '@expo/vector-icons';
import {router} from 'expo-router';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function StaticHeader({
	title,
	subTitle,
}: {
	title: string;
	subTitle: string;
}) {
	return (
		<View className='px-4 pt-4 pb-6 bg-brand text-white'>
			<TouchableOpacity
				onPress={() => {
					router.back();
				}}
				className='flex hover:cursor-pointer'
			>
				<AntDesign name='left' size={15} color='white' />
			</TouchableOpacity>
			<Text className='text-center text-white text-lg font-semibold'>
				{title}
			</Text>
			<View className='mt-10'>
				<Text className='text-white'>{subTitle}</Text>
			</View>
		</View>
	);
}
