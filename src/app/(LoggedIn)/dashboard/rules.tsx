import {FlatList, Text, View} from 'react-native';
import StaticHeader from 'src/components/StaticHeader';

export default function Rules() {
	return (
		<>
			<StaticHeader
				title='Rules'
				subTitle='Following are rules of the game:'
			/>
			<FlatList
				contentContainerStyle={{padding: 15}}
				data={[
					{
						key: 'USERS CAN CHOOSE AND BET ON ANY NUMBERS AMONG 10 NUMBERS GIVEN.',
					},
					{
						key: 'THERE WILL BE 5 WINNING NUMBERS EVERY TIME AMONG OF THOSE 10 NUMBERS.',
					},
					{
						key: 'WINNING NUMBERS WILL BE THOSE WITH THE LOWEST BETTING AMOUNTS.',
					},
					{
						key: 'USERS WITH WINNING BETS WILL WIN 2X AMOUNT ON THEIR BETS.',
					},
				]}
				renderItem={({item, index}) => {
					return (
						<View className='mb-2 flex flex-row'>
							<Text className='font-semibold text-sm'>
								{index + 1}.{' '}
							</Text>
							<Text className='text-md'>{item.key}</Text>
						</View>
					);
				}}
			/>
		</>
	);
}
