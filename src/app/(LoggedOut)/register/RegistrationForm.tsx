import {router} from 'expo-router';
import {Formik} from 'formik';
import {useState} from 'react';
import {
	ActivityIndicator,
	Keyboard,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import EmailIcon from 'src/assets/images/email.svg';
import PasswordIcon from 'src/assets/images/password.svg';
import request from 'src/axios/request';
import {buttonTextVariants, buttonVariants} from 'src/components/Button';
import {object, ref, string} from 'yup';

const regSchema = object({
	first_name: string().required('Required Field'),
	last_name: string().required('Required Field'),
	phone_no: string().required('Required Field'),
	email: string().required('Required Field'),
	refred_by: string(),
	password: string()
		.required('Required Field')
		.min(6, 'Your password is too short.'),
	c_password: string()
		.required('Required Field')
		.oneOf([ref('password')], 'Passwords must match'),
});

export default function RegistrationForm() {
	const [state, setState] = useState<{
		isLoading: boolean;
		showPassword: boolean;
		errors: string[];
	}>({
		isLoading: false,
		showPassword: false,
		errors: [],
	});
	async function onSubmit({...e}: any) {
		console.log(e);
		Keyboard.dismiss();
		setState((prev) => ({...prev, isLoading: true}));
		const {HttpStatusCode, status, data} = await request(
			'POST',
			'/account/register/',
			{},
			e
		);
		setState((prev) => ({...prev, isLoading: false}));
		console.log(status, data);
		if (HttpStatusCode.BAD_REQUEST === status) {
			if (data) {
				const errors = Object.keys(data).map((e) => e + ' ' + data[e]);
				setState((prev) => ({...prev, errors}));
			}
			return;
		}

		if (HttpStatusCode.CREATED === status && data) {
			Toast.show('Account Created Successfully', {
				duration: Toast.durations.SHORT,
			});
			router.replace('/login/');
			return;
		}
	}

	return (
		<Formik
			validationSchema={regSchema}
			validateOnBlur
			initialValues={{
				first_name: '',
				last_name: '',
				phone_no: '',
				email: '',
				password: '',
				c_password: '',
				refred_by: '',
			}}
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
				<ScrollView>
					<Text className='text-center text-lg'>Login to Play</Text>
					<View>
						<View>
							<Text>First Name</Text>
							<View className='w-full h-12 relative mb-2'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('first_name')}
									onBlur={handleBlur('first_name')}
									value={values.first_name}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<EmailIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='first_name'
							/>
						</View>
						<View>
							<Text>Last Name</Text>
							<View className='w-full h-12 relative mb-2'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('last_name')}
									onBlur={handleBlur('last_name')}
									value={values.last_name}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='last_name'
							/>
						</View>
						<View>
							<Text>Phone No.</Text>
							<View className='w-full h-12 relative mb-2'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('phone_no')}
									onBlur={handleBlur('phone_no')}
									value={values.phone_no}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='phone_no'
							/>
						</View>
						<View>
							<Text>Referral Code</Text>
							<View className='w-full h-12 relative mb-2'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('refred_by')}
									onBlur={handleBlur('refred_by')}
									value={values.refred_by}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='refred_by'
							/>
						</View>

						<View>
							<Text>Email</Text>
							<View className='w-full h-12 relative mb-2'>
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
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='email'
							/>
						</View>

						<View>
							<Text>Password</Text>
							<View className='w-full h-12 relative mb-2'>
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
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='password'
							/>
						</View>

						<View>
							<Text>Confirm Password</Text>
							<View className='w-full h-12 relative mb-2'>
								<TextInput
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('c_password')}
									onBlur={handleBlur('c_password')}
									value={values.c_password}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-10'
								/>
								<View className='absolute left-2 top-3'>
									<PasswordIcon />
								</View>
							</View>
							<Error
								touched={touched}
								errors={errors}
								fieldName='c_password'
							/>
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
								className={buttonVariants.default}
								onPress={() => handleSubmit()}
							>
								{state.isLoading && (
									<ActivityIndicator
										className='mr-2'
										color='white'
									/>
								)}
								<Text className={buttonTextVariants.default}>
									Create Account
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			)}
		</Formik>
	);
}

function Error({
	errors,
	fieldName,
	touched,
}: {
	fieldName: any;
	errors: any;
	touched: any;
}) {
	return (
		<View className='ml-2'>
			{errors[fieldName] && touched[fieldName] && (
				<Text className='text-[#590212] '>{errors[fieldName]}</Text>
			)}
		</View>
	);
}
