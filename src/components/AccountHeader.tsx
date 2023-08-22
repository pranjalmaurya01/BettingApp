import {AntDesign} from '@expo/vector-icons';
import {router, useFocusEffect} from 'expo-router';
import {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useUser from 'src/store/useUser';
import useWallet, {getWallet} from 'src/store/useWallet';

export default function AccountHeader({title}: {title: string}) {
	const {amt, setAmt} = useWallet((state) => state);
	const user = useUser((state) => state.data);

	useFocusEffect(
		useCallback(() => {
			(async () => {
				if (user) {
					const money = await getWallet(user.id);
					if (money !== undefined) setAmt(money);
				}
			})();
		}, [user])
	);

	return (
		<View className='px-4 pt-4 pb-6 bg-brand text-white'>
			<TouchableOpacity
				onPress={() => {
					router.back();
				}}
				className='flex hover:cursor-pointer'
			>
				<AntDesign name='left' size={20} color='white' />
			</TouchableOpacity>
			<Text className='font-semibold text-center text-white text-lg'>
				{title}
			</Text>
			<View className='flex justify-between flex-row mt-10'>
				<Text className='text-white'>Available Balance</Text>
				<Text className='font-semibold text-white'>
					{amt === undefined ? (
						<ActivityIndicator className='mr-2' color='white' />
					) : (
						amt
					)}
				</Text>
			</View>
		</View>
	);
}
