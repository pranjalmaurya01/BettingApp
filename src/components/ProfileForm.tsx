import * as ImagePicker from 'expo-image-picker';
import {Formik} from 'formik';
import mime from 'mime';
import {useState} from 'react';
import {
	ActivityIndicator,
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import request from 'src/axios/request';
import useUser, {UserDataI, getUserData} from 'src/store/useUser';
import {object, string} from 'yup';
import {buttonTextVariants, buttonVariants} from './Button';

const regSchema = object({
	first_name: string().required('Required Field'),
	last_name: string().required('Required Field'),
	profile_picture: string(),
});

export default function ProfileForm({user}: {user: UserDataI}) {
	const setUserData = useUser((state) => state.setData);

	const [state, setState] = useState<{
		isLoading: boolean;
		showPassword: boolean;
		errors: string[];
	}>({
		isLoading: false,
		showPassword: false,
		errors: [],
	});

	const updateState = (obj: {errors?: string[]; isLoading?: boolean}) => {
		setState((prev) => ({...prev, ...obj}));
	};

	const pickImage = async (setImage: any) => {
		Keyboard.dismiss();
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.canceled) {
			setImage('profile_picture', result.assets[0].uri);
		}
		Keyboard.dismiss();
	};

	async function UpdateProfileData() {
		const userData = await getUserData();
		if (userData) {
			setUserData(userData);
			return;
		}
	}

	async function onSubmit({
		first_name,
		last_name,
		profile_picture,
	}: {
		first_name: string;
		last_name: string;
		profile_picture: string;
	}) {
		updateState({
			isLoading: true,
		});
		const fd = new FormData();
		fd.append('first_name', first_name);
		fd.append('last_name', last_name);
		if (profile_picture) {
			const img: any = {
				uri: profile_picture,
				name: profile_picture.split('/').pop(),
				type: mime.getType(profile_picture),
			};
			fd.append('profile_picture', img);
		}
		const {HttpStatusCode, status, data} = await request(
			'PATCH',
			'/account/update-profile/',
			{},
			fd,
			{'content-type': 'multipart/form-data'}
		);
		updateState({
			isLoading: false,
		});
		console.log(data, status);
		if (HttpStatusCode.OK === status && data) {
			UpdateProfileData();
		}
	}
	return (
		<Formik
			validationSchema={regSchema}
			validateOnBlur
			initialValues={{
				first_name: user.first_name,
				last_name: user.last_name,
				profile_picture: '',
			}}
			onSubmit={onSubmit}
		>
			{({
				setFieldValue,
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
			}) => (
				<View>
					<View>
						<Text>First Name</Text>
						<View className='w-full h-12 relative'>
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
								className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 px-3'
							/>
						</View>
						<View className='ml-2'>
							{errors.first_name && touched.first_name && (
								<Text className='text-[#590212] '>
									{errors.first_name}
								</Text>
							)}
						</View>
					</View>
					<View className='mt-4'>
						<View>
							<Text>Last Name</Text>
							<View className='w-full h-12 relative'>
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
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-3'
								/>
							</View>
							<View className='ml-2'>
								{errors.last_name && touched.last_name && (
									<Text className='text-[#590212] '>
										{errors.last_name}
									</Text>
								)}
							</View>
						</View>
					</View>
					<View className='mt-4'>
						<View>
							<Text>Profile Image</Text>
							<View className='w-full h-12 relative'>
								<TextInput
									onPressIn={() => {
										pickImage(setFieldValue);
									}}
									onFocus={() => {
										setState((prev) => ({
											...prev,
											errors: [],
										}));
									}}
									onChangeText={handleChange(
										'profile_picture'
									)}
									onBlur={handleBlur('profile_picture')}
									value={
										values.profile_picture && 'Profile Img'
									}
									className='absolute left-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 mb-4 px-3'
								/>
							</View>
							<View className='ml-2'>
								{errors.profile_picture &&
									touched.profile_picture && (
										<Text className='text-[#590212] '>
											{errors.profile_picture}
										</Text>
									)}
							</View>
						</View>
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
