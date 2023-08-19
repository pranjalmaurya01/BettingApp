import {Tabs, useSegments} from 'expo-router';
import {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import WinIconFocussed from 'src/assets/images/btn1-selected.svg';
import WinIcon from 'src/assets/images/btn1.svg';
import AccountIconFocussed from 'src/assets/images/btn2-selected.svg';
import AccountIcon from 'src/assets/images/btn2.svg';
import User from 'src/components/User';

export default function Layout() {
	const segments = useSegments() as string[];
	const [isLoading, setIsLoading] = useState(true);

	function updateIsLoading() {
		setIsLoading(false);
	}

	const isAccountSelected =
		segments.includes('(options)') || segments.includes('account');

	return (
		<>
			<User updateIsLoading={updateIsLoading} />
			{isLoading && (
				<ActivityIndicator className='m-2' color='#590212' size={30} />
			)}
			<Tabs
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name='dashboard/index'
					options={{
						tabBarButton: (x) => {
							return (
								<TouchableOpacity
									onPress={(e) => {
										if (x.onPress) x.onPress(e);
									}}
									className='flex-1 flex-row justify-center items-center'
								>
									<View
										className={`${
											x.accessibilityState?.selected &&
											'bg-brand'
										} flex-row justify-center items-center p-1 rounded-3xl`}
									>
										<View className='bg-white rounded-full'>
											{x.accessibilityState?.selected ? (
												<WinIconFocussed />
											) : (
												<WinIcon />
											)}
										</View>
										<Text
											className={`font-semibold px-3 text-gray-900 ${
												x.accessibilityState
													?.selected && 'text-white'
											}
											`}
										>
											Win
										</Text>
									</View>
								</TouchableOpacity>
							);
						},
					}}
				/>
				<Tabs.Screen
					name='account/index'
					options={{
						tabBarButton: (x) => {
							return (
								<TouchableOpacity
									onPress={(e) => {
										if (x.onPress) x.onPress(e);
									}}
									className='flex-1 flex-row justify-center items-center'
								>
									<View
										className={`${
											(x.accessibilityState?.selected ||
												isAccountSelected) &&
											'bg-brand'
										} flex-row justify-center items-center p-1 rounded-3xl`}
									>
										<View className='bg-white rounded-full'>
											{x.accessibilityState?.selected ||
											isAccountSelected ? (
												<AccountIconFocussed />
											) : (
												<AccountIcon />
											)}
										</View>
										<Text
											className={`font-semibold px-3 text-gray-900 ${
												(x.accessibilityState
													?.selected ||
													isAccountSelected) &&
												'text-white'
											}
											`}
										>
											Account
										</Text>
									</View>
								</TouchableOpacity>
							);
						},
					}}
				/>
				<Tabs.Screen
					name='(options)'
					options={{
						href: null,
					}}
				/>
			</Tabs>
		</>
	);
}
