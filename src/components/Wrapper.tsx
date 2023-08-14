import {ReactElement, ReactNode} from 'react';
import {View} from 'react-native';

export default function Wrapper({
	styles,
	children,
}: {
	styles?: string;
	children: ReactNode | ReactElement;
}) {
	return <View className={`${styles}`}>{children}</View>;
}
