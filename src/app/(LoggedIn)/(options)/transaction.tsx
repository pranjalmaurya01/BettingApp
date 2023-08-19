import AccountHeader from 'src/components/AccountHeader';
import Transaction from 'src/components/Transaction';

export default function Profile() {
	return (
		<>
			<AccountHeader title='Transaction History' />
			<Transaction />
		</>
	);
}
