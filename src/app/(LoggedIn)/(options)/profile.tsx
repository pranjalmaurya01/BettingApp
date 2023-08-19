import {AntDesign} from '@expo/vector-icons';
import {router} from 'expo-router';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import getBaseUrl from 'src/axios/baseUrl';
import ProfileForm from 'src/components/ProfileForm';
import useUser from 'src/store/useUser';

export default function Profile() {
	const data = useUser((state) => state.data);
	if (!data) return null;
	return (
		<View>
			<View className='px-4 pt-4 pb-20 bg-brand text-white'>
				<TouchableOpacity
					onPress={() => {
						router.back();
					}}
					className='flex hover:cursor-pointer'
				>
					<AntDesign name='left' size={15} color='white' />
				</TouchableOpacity>
				<Text className='text-center text-white text-lg font-semibold'>
					Profile
				</Text>
			</View>
			<View className='bg-white pb-10'>
				<View className='flex-row justify-center -mt-16'>
					<View className='border-white border-2 rounded-full'>
						<Image
							source={
								data.profile_picture
									? getBaseUrl() + data.profile_picture
									: require('src/assets/images/profile.jpg')
							}
							className='h-32 w-32 rounded-full'
						/>
					</View>
				</View>
				<View className='mx-2 mt-4'>
					<ProfileForm user={data} />
				</View>
			</View>
		</View>
	);
}
