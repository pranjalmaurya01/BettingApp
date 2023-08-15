import {Link, router} from 'expo-router';
import {Formik} from 'formik';
import {useState} from 'react';
import {
	ActivityIndicator,
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import EmailIcon from 'src/assets/images/email.svg';
import PasswordIcon from 'src/assets/images/password.svg';
import {setJwt} from 'src/axios/jwt';
import request from 'src/axios/request';
import {buttonTextVariants, buttonVariants} from 'src/components/Button';
import {z} from 'zod';
import {toFormikValidationSchema} from 'zod-formik-adapter';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, 'Invalid Password'),
});

export default function LoginForm() {
	const [state, setState] = useState<{
		isLoading: boolean;
		showPassword: boolean;
		errors: string[];
	}>({
		isLoading: false,
		showPassword: false,
		errors: [],
	});

	async function onSubmit({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) {
		Keyboard.dismiss();
		setState((prev) => ({...prev, isLoading: true}));
		const {HttpStatusCode, status, data} = await request(
			'POST',
			'/account/login/',
			{},
			{email, password}
		);
		setState((prev) => ({...prev, isLoading: false}));
		if (
			HttpStatusCode.BAD_REQUEST === status ||
			HttpStatusCode.UNAUTHORIZED === status
		) {
			if (data) {
				const errors = Object.keys(data).map((e) => data[e]);
				setState((prev) => ({...prev, errors}));
			}
			return;
		}
		if (HttpStatusCode.OK === status && data) {
			Toast.show(`Welcome Back, ${data.email}`, {
				duration: Toast.durations.SHORT,
			});
			const {access, refresh} = data.tokens;
			await setJwt({access, refresh});
			router.replace('/dashboard/');
			return;
		}
	}

	return (
		<View>
			<Text className='text-center text-lg'>Login to Play</Text>
			<Formik
				validateOnBlur
				validationSchema={toFormikValidationSchema(formSchema)}
				initialValues={{email: '', password: ''}}
				onSubmit={onSubmit}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					<View>
						<View>
							<Text>Email</Text>
							<View className='w-full h-12 relative'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<EmailIcon />
								</View>
							</View>
							<View className='ml-2'>
								{errors.email && touched.email && (
									<Text className='text-[#590212] '>
										{errors.email}
									</Text>
								)}
							</View>
						</View>
						<View className='mt-4'>
							<View>
								<Text>Password</Text>
								<View className='w-full h-12 relative'>
									<TextInput
										onFocus={() => {
											setState((prev) => ({
												...prev,
												errors: [],
											}));
										}}
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
										value={values.password}
										secureTextEntry
										className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
									/>
									<View className='absolute left-2 top-3'>
										<PasswordIcon />
									</View>
								</View>
								<View className='ml-2'>
									{errors.password && touched.password && (
										<Text className='text-[#590212] '>
											{errors.password}
										</Text>
									)}
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
						<View>
							{state.errors.map((e) => (
								<Text
									key={e}
									className='font-semibold text-red-500'
								>
									{e}
								</Text>
							))}
						</View>
						<View className='my-2'>
							<TouchableOpacity
								activeOpacity={state.isLoading ? 1 : 0.7}
								disabled={state.isLoading}
								className={buttonVariants()}
								onPress={() => handleSubmit()}
							>
								{state.isLoading && (
									<ActivityIndicator
										className='mr-2'
										color='white'
									/>
								)}
								<Text className={buttonTextVariants()}>
									Sign In
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</Formik>
		</View>
	);
}
