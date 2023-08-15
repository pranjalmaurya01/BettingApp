import {
	AntDesign,
	Entypo,
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import {router} from 'expo-router';
import {ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logout} from 'src/utils';
import {buttonTextVariants, buttonVariants} from './Button';

const paths: {[key: number]: any} = {
	0: '/profile',
	1: '/change-password',
	2: '/recharge',
	3: '/withdraw',
	4: '/refer',
	5: '/transaction',
	6: '/support',
};

export default function NavLinks() {
	function onPress(type: number) {
		if (type < 7) {
			router.push(paths[type]);
			return;
		}
		logout();
	}

	return (
		<ScrollView className='mt-2 px-2'>
			<TouchableOpacity
				onPress={() => {
					onPress(0);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<MaterialCommunityIcons
						name='account'
						size={24}
						color='black'
					/>
				</View>
				<Text className='flex-1'>Profile</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(1);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<FontAwesome5 name='key' size={24} color='black' />
				</View>
				<Text className='flex-1'>Change Password</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(2);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<Entypo name='download' size={24} color='black' />
				</View>
				<Text className='flex-1'>Recharge</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(3);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<Entypo name='upload' size={24} color='black' />
				</View>
				<Text className='flex-1'>Withdraw</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(4);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<MaterialIcons
						name='attach-money'
						size={24}
						color='black'
					/>
				</View>
				<Text className='flex-1'>Refer and earn</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(5);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<MaterialCommunityIcons
						name='account'
						size={24}
						color='black'
					/>
				</View>
				<Text className='flex-1'>Transaction History</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					onPress(6);
				}}
				className='flex-row items-center justify-center py-3'
			>
				<View className='mr-3'>
					<Ionicons name='call' size={24} color='black' />
				</View>
				<Text className='flex-1'>Support</Text>
				<View>
					<AntDesign name='right' size={24} color='black' />
				</View>
			</TouchableOpacity>
			<View className='mt-5'>
				<TouchableOpacity
					className={buttonVariants({variant: 'outline'})}
					onPress={() => {
						onPress(7);
					}}
				>
					<Text className={buttonTextVariants({variant: 'outline'})}>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
