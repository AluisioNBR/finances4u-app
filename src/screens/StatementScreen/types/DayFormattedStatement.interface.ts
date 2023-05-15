import { Transaction } from '../../../@types/data/Transaction.interface'

export interface DayFormattedStatement {
	day: number
	transactions: Transaction[]
}
