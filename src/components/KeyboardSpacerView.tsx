import {useKeyboard} from '@react-native-community/hooks';
import {View} from 'react-native';

export const KeyboardSpacerView: React.FC = () => {
	const keyboard = useKeyboard();

	return (
		<View
			style={{
				height: keyboard.keyboardHeight,
			}}
		/>
	);
};
