import {Link} from 'expo-router';
import {Text, View} from 'react-native';
import Logo from 'src/assets/images/logo.svg';
import LoginForm from './components/LoginForm';

export default function Login() {
	return (
		<View className='w-screen h-screen flex-1 justify-center'>
			<View className='py-5 w-full bg-brand'>
				<View className='flex items-center'>
					<Logo />
					<Text className='text-sm text-center font-semibold text-white'>
						100% Secure and Safe
					</Text>
				</View>
			</View>
			<View className='w-full pt-6 -mt-2 bg-white rounded-2xl px-2 pb-4'>
				<LoginForm />
				<View className='flex flex-row justify-center'>
					<Text className='text-sm'>
						Don&apos;t have an account?&nbsp;
					</Text>
					<Link href='/register/' className='text-sm'>
						<Text>Sign Up</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}
