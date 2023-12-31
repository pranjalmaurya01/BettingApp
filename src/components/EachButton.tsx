import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { buttonTextVariants, buttonVariants } from './Button';

const colorCombination: { [key: number]: keyof typeof buttonVariants } = {
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
	tBetAmt,
	disabled,
	onPress,
}: {
	text: number;
	idx: number;
	tBetAmt: number;
	disabled: boolean;
	onPress: () => void;
}) {
	const bClassName = buttonVariants[colorCombination[idx]];
	if (colorCombination[idx] !== undefined)
		return (
			<View>
				<TouchableOpacity
					className={`${bClassName} ${disabled && 'opacity-60'}`}
					onPress={onPress}
					disabled={disabled}
				>
					<Text className={buttonTextVariants.eb}>{text}</Text>
				</TouchableOpacity>
				<Text className='text-center text-gray-600 text-sm'>
					{tBetAmt || 0}
				</Text>
			</View>
		);
	if (idx === 8)
		return (
			<View>
				<ImageBackground
					source={require('src/assets/images/nine.png')}
					className={disabled ? 'opacity-60' : ''}
				>
					<TouchableOpacity
						disabled={disabled}
						className={`${buttonVariants.number_common} ${
							disabled && 'opacity-60'
						}`}
						onPress={onPress}
					>
						<Text className={buttonTextVariants.eb}>{text}</Text>
					</TouchableOpacity>
				</ImageBackground>
				<Text className='text-center text-gray-600 text-sm'>
					{tBetAmt || 0}
				</Text>
			</View>
		);

	return (
		<View>
			<ImageBackground
				source={require('src/assets/images/ten.png')}
				className={disabled ? 'opacity-60' : ''}
			>
				<TouchableOpacity
					disabled={disabled}
					className={`${buttonVariants.number_common} ${
						disabled && 'opacity-60'
					}`}
					onPress={onPress}
				>
					<Text className={buttonTextVariants.eb}>{text}</Text>
				</TouchableOpacity>
			</ImageBackground>
			<Text className='text-center text-gray-600 text-sm'>
				{tBetAmt || 0}
			</Text>
		</View>
	);
}
