import { Transaction } from '../../../@types/data/Transaction.interface'

export interface DayTransactionsContainerProps {
	dayKey: string
	children: Transaction[]
}
