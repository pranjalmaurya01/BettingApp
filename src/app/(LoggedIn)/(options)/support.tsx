import {MaterialIcons} from '@expo/vector-icons';
import {Text, View} from 'react-native';
import StaticHeader from 'src/components/StaticHeader';

export default function Profile() {
	return (
		<View>
			<StaticHeader
				title='Support'
				subTitle='For support & help contact on given details.'
			/>
			<View className='px-3'>
				<View className='flex-row items-center mt-3 mb-5'>
					<MaterialIcons name='email' size={24} color='black' />
					<Text className='ml-2 flex-1'>support@tableno21.com</Text>
				</View>
				<View className='flex-row items-center mb-5'>
					<MaterialIcons name='email' size={24} color='black' />
					<Text className='ml-2 flex-1'>support@tableno21.com</Text>
				</View>
				<View className='flex-row items-center mb-5'>
					<MaterialIcons name='email' size={24} color='black' />
					<Text className='ml-2 flex-1'>support@tableno21.com</Text>
				</View>
			</View>
		</View>
	);
}
