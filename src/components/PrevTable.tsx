import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import request from 'src/axios/request';
import { buttonTextVariants, buttonVariants } from './Button';
import { AntDesign } from '@expo/vector-icons';

const fetchData = async (pageNo: number) => {
	const { HttpStatusCode, status, data } = await request(
		'GET',
		`/bet/winning-number/?page=${pageNo}`
	);
	if (status === HttpStatusCode.OK && data) {
		return data;
	}
	return null;
};

export default function PrevTable({ remTime }: { remTime: string }) {
	const [state, setState] = useState<{
		results: { id: string; all_winning: string }[];
		pages: number[];
		currentPage: number;
	}>({
		results: [],
		pages: [],
		currentPage: 1,
	});

	const splitRemTime = remTime.split(':');
	const rerender = splitRemTime[0] === '0' && splitRemTime[1] === '00';

	useEffect(() => {
		setData(1);
	}, []);

	async function setData(page: number) {
		const data = await fetchData(page);
		if (data.results.length > 0) {
			setState((prev) => ({
				...prev,
				pages: data.page_numbers,
				results: data.results,
			}));
		}
	}

	useEffect(() => {
		if (rerender) setData(state.currentPage);
	}, [rerender]);

	function findNearestElementsWithTarget(arr: number[], target: number) {
		if (arr.length <= 5) {
			return arr;
		}

		let startIndex = 0;
		let minDiff = Math.abs(arr[startIndex] - target);

		for (let i = 1; i < arr.length - 4; i++) {
			const currentDiff = Math.abs(arr[i] - target);
			if (currentDiff < minDiff) {
				startIndex = i;
				minDiff = currentDiff;
			}
		}

		const middleIndex = startIndex + 2;
		return arr.slice(middleIndex - 2, middleIndex + 3);
	}

	const renderNavButtons = () => {
		if (state.pages.length < 6) {
			return state.pages.map((e) => (
				<TouchableOpacity
					className={`py-2 px-4 mx-[1px] rounded-md ${
						state.currentPage === e ? 'bg-[#590212]' : 'bg-white'
					}`}
					key={e}
				>
					<Text className={buttonTextVariants.eb}>{e}</Text>
				</TouchableOpacity>
			));
		}

		const nearest: number[] = findNearestElementsWithTarget(
			state.pages,
			state.currentPage
		);

		return nearest.map((e) => (
			<TouchableOpacity
				onPress={() => {
					setData(e);
					setState((prev) => ({
						...prev,
						currentPage: e,
					}));
				}}
				className={`py-2 px-4 mx-[1px] rounded-md ${
					state.currentPage === e ? 'bg-[#590212]' : 'bg-white '
				}`}
				key={e}
			>
				<Text
					className={`${
						state.currentPage === e
							? buttonTextVariants.bet
							: 'text-black'
					}`}
				>
					{e}
				</Text>
			</TouchableOpacity>
		));
	};

	return (
		<View className='m-2'>
			<View className='flex flex-row justify-between items-center my-2'>
				<Text>3 Min Record</Text>
				<TouchableOpacity className={buttonVariants.start}>
					<Text className={buttonTextVariants.bet}>Bet Records</Text>
				</TouchableOpacity>
			</View>
			<View>
				<View
					className='mt-4 rounded-2xl'
					style={{
						elevation: 1,
						shadowColor: '#000000',
						backgroundColor: '#fff',
					}}
				>
					<View className=' bg-[#0D6EFD] flex flex-row justify-around py-3 rounded-t-2xl'>
						<Text className='text-white text-sm'>ID</Text>
						<Text className='text-white text-sm'>Result</Text>
					</View>
					<View>
						{state.results.map((r, i) => (
							<View
								key={r.id}
								className={`flex flex-row justify-around pt-3 text-sm border-[#8F8F8F] ${
									i !== state.results.length - 1
										? 'border-b-[.5px]'
										: 'pb-1'
								}`}
							>
								<Text className='text-gray-800 '>
									{r.id.split('-')[0]}
								</Text>
								<Text className='text-gray-800 '>
									{r.all_winning.split(',').join('  ')}
								</Text>
							</View>
						))}
					</View>
				</View>
				<View className='flex flex-row justify-between mt-4 items-center'>
					<TouchableOpacity
						className={buttonVariants.prev}
						disabled={!state.pages.includes(state.currentPage - 1)}
						onPress={() => {
							setData(state.currentPage - 1);
							setState((prev) => ({
								...prev,
								currentPage: prev.currentPage - 1,
							}));
						}}
					>
						<AntDesign name='caretleft' size={15} color='white' />
					</TouchableOpacity>
					<View className='flex flex-row mx-1'>
						{renderNavButtons()}
					</View>
					<TouchableOpacity
						className={buttonVariants.prev}
						disabled={!state.pages.includes(state.currentPage + 1)}
						onPress={() => {
							setData(state.currentPage + 1);
							setState((prev) => ({
								...prev,
								currentPage: prev.currentPage + 1,
							}));
						}}
					>
						<AntDesign name='caretright' size={15} color='white' />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
