import {View} from 'react-native';
import ChangePasswordForm from 'src/components/ChangePasswordForm';
import StaticHeader from 'src/components/StaticHeader';

export default function ChangePassword() {
	return (
		<>
			<StaticHeader
				title='Change Password'
				subTitle='Enhance Your Security: Update Your Password.'
			/>
			<View className='mx-2 mt-4'>
				<ChangePasswordForm />
			</View>
		</>
	);
}
