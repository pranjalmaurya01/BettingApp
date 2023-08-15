import {router, useRootNavigationState} from 'expo-router';
import {useEffect} from 'react';
import {getJwt} from 'src/axios/jwt';

export default function Index() {
	const rootNavigationState = useRootNavigationState();
	useEffect(() => {
		if (!rootNavigationState?.key) {
			(async () => {
				const tokens = await getJwt();
				if (tokens) {
					router.replace('/dashboard');
					return;
				}
				router.replace('/login');
			})();
		}
	}, [rootNavigationState]);

	return null;
}
