import {Link} from 'expo-router';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import EmailIcon from 'src/assets/images/email.svg';
import PasswordIcon from 'src/assets/images/password.svg';
import {buttonTextVariants, buttonVariants} from 'src/components/Button';

export default function LoginForm() {
	return (
		<View>
			<Text className='text-center text-lg'>Login to Play</Text>
			<View>
				<View>
					<Text>Email</Text>
					<View className='w-full h-16 relative'>
						<TextInput
							onChange={() => {}}
							id='email'
							className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
						/>
						<View className='absolute left-2 top-3'>
							<EmailIcon />
						</View>
					</View>
				</View>
				<View>
					<View>
						<Text>Password</Text>
						<View className='w-full h-16 relative'>
							<TextInput
								onChange={() => {}}
								id='email'
								secureTextEntry
								className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
							/>
							<View className='absolute left-2 top-3'>
								<PasswordIcon />
							</View>
						</View>
					</View>
				</View>
				<View className='flex-row justify-end'>
					<Link href='/forgot-password'>
						<Text className='text-sm font-semibold text-brand'>
							Forgot Password ?
						</Text>
					</Link>
				</View>
				<View className='my-2'>
					<TouchableOpacity className={buttonVariants()}>
						<Text className={buttonTextVariants()}>Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
