import { Transaction } from '../../../@types/data/Transaction.interface'
import { User } from '../../../@types/data/User.interface'

export interface BalanceInfosProps {
	statement: Transaction[]
	children: User
}
