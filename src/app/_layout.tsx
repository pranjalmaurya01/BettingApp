import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Slot, SplashScreen} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {View} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from 'src/assets/images/logo.svg';
import '../styles/global.css';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('src/assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return (
			<View className='h-screen w-screen flex justify-center items-center'>
				<Logo />
			</View>
		);
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<RootSiblingParent>
				<StatusBar style='dark' />
				<SafeAreaView className='flex-1'>
					<Slot />
				</SafeAreaView>
			</RootSiblingParent>
		</ThemeProvider>
	);
}
