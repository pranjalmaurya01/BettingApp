import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {buttonTextVariants, buttonVariants} from './Button';

const colorCombination: {[key: number]: keyof typeof buttonVariants} = {
	0: 'number_red',
	1: 'number_green',
	2: 'number_red',
	3: 'number_green',
	4: 'number_green',
	6: 'number_green',
	5: 'number_red',
	7: 'number_red',
};

export default function EachButton({
	text,
	idx,
	// tBetAmt,
	// disabled,
	onPress,
}: {
	text: number;
	idx: number;
	// tBetAmt: number;
	// disabled: boolean;
	onPress: () => void;
}) {
	const bClassName = buttonVariants[colorCombination[idx]];

	if (colorCombination[idx] !== undefined)
		return (
			<TouchableOpacity className={bClassName} onPress={onPress}>
				<Text className={buttonTextVariants.eb}>{text}</Text>
			</TouchableOpacity>
		);
	if (idx === 8)
		return (
			<ImageBackground source={require('src/assets/images/nine.png')}>
				<TouchableOpacity
					className={buttonVariants.number_common}
					onPress={onPress}
				>
					<Text className={buttonTextVariants.eb}>{text}</Text>
				</TouchableOpacity>
			</ImageBackground>
		);

	return (
		<ImageBackground source={require('src/assets/images/ten.png')}>
			<TouchableOpacity
				className={buttonVariants.number_common}
				onPress={onPress}
			>
				<Text className={buttonTextVariants.eb}>{text}</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
}
