import {useEffect} from 'react';
import {getUserAsyncStorage} from 'src/axios/user';
import useUser, {getUserData} from 'src/store/useUser';
import useWs, {getButtonData} from 'src/store/useWs';
import {logout} from 'src/utils';

export default function User({updateIsLoading}: {updateIsLoading: () => void}) {
	const setData = useUser((state) => state.setData);
	const setButtonData = useWs((state) => state.setButtonData);

	useEffect(() => {
		(async () => {
			const userDataS = await getUserAsyncStorage();
			if (userDataS) {
				setData(userDataS);
				updateIsLoading();
			}
			const data = await Promise.all([getUserData(), getButtonData()]);
			if (data[0] && data[1]) {
				setData(data[0]);
				setButtonData(data[1]);
				updateIsLoading();
			} else {
				logout();
			}
		})();
	}, []);

	return null;
}
