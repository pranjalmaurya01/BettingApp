import {Formik} from 'formik';
import {useState} from 'react';
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import request from 'src/axios/request';
import useUser from 'src/store/useUser';
import {object, ref, string} from 'yup';
import {buttonTextVariants, buttonVariants} from './Button';

const regSchema = object({
	old_password: string().required('Required Field'),
	password: string()
		.required('Required Field')
		.min(6, 'Your password is too short.'),
	password2: string()
		.required('Required Field')
		.oneOf([ref('password')], 'Passwords must match'),
});

export default function ChangePasswordForm() {
	const user = useUser((state) => state.data);

	const [state, setState] = useState<{
		isLoading: boolean;
		errors: string[];
	}>({
		isLoading: false,
		errors: [],
	});

	const updateState = (obj: {errors?: string[]; isLoading?: boolean}) => {
		setState((prev) => ({...prev, ...obj}));
	};

	async function onSubmit({
		old_password,
		password,
		password2,
		resetForm,
	}: {
		old_password: string;
		password: string;
		password2: string;
		resetForm: () => void;
	}) {
		updateState({
			isLoading: true,
		});
		const {HttpStatusCode, status, data} = await request(
			'PUT',
			`/account/change_password/${user?.id}/`,
			{},
			{old_password, password, password2}
		);
		updateState({
			isLoading: false,
		});
		if (HttpStatusCode.OK === status && data) {
			Toast.show(`Password Updated`, {
				duration: Toast.durations.LONG,
			});
			resetForm();
			return;
		}
		if (HttpStatusCode.BAD_REQUEST && data) {
			const errors = Object.keys(data).map((e) => data[e]);
			updateState({errors});
			return;
		}
	}
	return (
		<Formik
			validationSchema={regSchema}
			validateOnBlur
			initialValues={{
				old_password: '',
				password: '',
				password2: '',
			}}
			onSubmit={(e, actions) =>
				onSubmit({...e, resetForm: actions.resetForm})
			}
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
						<Text>Old Password</Text>
						<View className='w-full h-12 relative'>
							<TextInput
								secureTextEntry
								onFocus={() => {
									setState((prev) => ({
										...prev,
										errors: [],
									}));
								}}
								onChangeText={handleChange('old_password')}
								onBlur={handleBlur('old_password')}
								value={values.old_password}
								className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 px-3'
							/>
						</View>
						<View className='ml-2'>
							{errors.old_password && touched.old_password && (
								<Text className='text-[#590212] '>
									{errors.old_password}
								</Text>
							)}
						</View>
					</View>
					<View className='mt-4'>
						<View>
							<Text>Password</Text>
							<View className='w-full h-12 relative'>
								<TextInput
									secureTextEntry
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-3'
								/>
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
					<View className='mt-4'>
						<View>
							<Text>Confirm Password</Text>
							<View className='w-full h-12 relative'>
								<TextInput
									secureTextEntry
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange('password2')}
									onBlur={handleBlur('password2')}
									value={values.password2}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-3'
								/>
							</View>
							<View className='ml-2'>
								{errors.password2 && touched.password2 && (
									<Text className='text-[#590212] '>
										{errors.password2}
									</Text>
								)}
							</View>
						</View>
					</View>

					<View className='mt-2'>
						{state.errors.map((e) => (
							<Text
								key={e}
								className='font-semibold text-red-500'
							>
								{e}
							</Text>
						))}
					</View>
					<View className='mt-6'>
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
								Update
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</Formik>
	);
}
