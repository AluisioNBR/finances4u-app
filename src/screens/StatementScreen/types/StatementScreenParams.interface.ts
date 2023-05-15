import { Transaction } from '../../../@types/data/Transaction.interface'

export interface StatementScreenParams {
	statement: Transaction[]
	balance: number
	availableBalance: number
}
