import {useEffect} from 'react';
import useUser, {getUserData} from 'src/store/useUser';
import useWs, {getButtonData} from 'src/store/useWs';

export default function User({updateIsLoading}: {updateIsLoading: () => void}) {
	const setData = useUser((state) => state.setData);
	const setButtonData = useWs((state) => state.setButtonData);

	useEffect(() => {
		(async () => {
			const data = await Promise.all([getUserData(), getButtonData()]);
			if (data) {
				setData(data[0]);
				setButtonData(data[1]);
				updateIsLoading();
			}
		})();
	}, []);

	return null;
}
