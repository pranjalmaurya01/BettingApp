import {View} from 'react-native';
import AccountHeader from 'src/components/AccountHeader';
import NavLinks from 'src/components/NavLinks';

export default function Account() {
	return (
		<View>
			<AccountHeader title='Account' />
			<NavLinks />
		</View>
	);
}
