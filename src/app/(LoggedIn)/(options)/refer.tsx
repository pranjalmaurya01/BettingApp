import * as Clipboard from 'expo-clipboard';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AccountHeader from 'src/components/AccountHeader';
import { buttonTextVariants, buttonVariants } from 'src/components/Button';
import useUser from 'src/store/useUser';
import useWallet, { getWallet } from 'src/store/useWallet';

export default function Profile() {
	const user = useUser((state) => state.data);
	const { setAmt } = useWallet((state) => state);

	useEffect(() => {
		(async () => {
			if (user) {
				const money = await getWallet(user.id);
				if (money !== undefined) setAmt(money);
			}
		})();
	}, [user]);

	if (!user) return null;

	return (
		<View>
			<AccountHeader title='Refer and Earn' />
			<View className='mx-4'>
				<View className='mt-4'>
					<View className='flex flex-row justify-between'>
						<Text className='text-brand font-semibold text-sm'>
							Referral Bonus
						</Text>
						<Text className='text-brand font-semibold text-sm'>
							Total Refers
						</Text>
					</View>
				</View>
				<View className='mt-2 '>
					<View className='flex flex-row justify-between'>
						<Text className='text-brand font-bold text-sm'>
							{user.refral_wallet}
						</Text>
						<Text className='text-brand font-bold text-sm'>
							{user.referral_count}
						</Text>
					</View>
				</View>
				<View className='mt-4 text-xs'>
					<Text className='mb-1'>
						Refer your friend and now earn 2% on every bet placed by
						your friend for LIFETIME.
					</Text>
				</View>
				<View className='mt-4'>
					<Text className=' text-brand text-lg'>
						Your Referral code
					</Text>
					<View className='flex items-center'>
						<Text className='text-xs'>{user.refral_code}</Text>
					</View>
				</View>
				<View className='mt-4'>
					<TouchableOpacity
						className={buttonVariants.default}
						onPress={async () => {
							await Clipboard.setStringAsync(
								'' + user.refral_code
							);
						}}
					>
						<Text className={buttonTextVariants.default}>
							Copy Code
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
