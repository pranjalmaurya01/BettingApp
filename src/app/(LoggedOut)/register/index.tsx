import {Link} from 'expo-router';
import {ScrollView, Text, View} from 'react-native';
import LogoIcon from 'src/assets/images/logo.svg';
import RegistrationForm from './RegistrationForm';

export default function Register() {
	return (
		<View className='w-screen h-screen flex-1 justify-center'>
			<View className='py-5 w-full bg-brand'>
				<View className='flex items-center'>
					<LogoIcon />
					<Text className='text-sm text-center font-semibold text-white'>
						100% Secure and Safe
					</Text>
				</View>
			</View>
			<ScrollView className='py-6 -mt-2 bg-white rounded-t-2xl px-2'>
				<RegistrationForm />
				<View className='flex flex-row justify-center'>
					<Text className='text-sm mr-1'>
						Already have an account ?
					</Text>
					<Link href='/login/' className='text-sm'>
						<Text>Log In</Text>
					</Link>
				</View>
			</ScrollView>
		</View>
	);
}
