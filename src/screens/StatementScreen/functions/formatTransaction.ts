import { Transaction } from '../../../@types/data/Transaction.interface'
import { MonthFormattedStatement } from '../types/MonthFormattedStatement.interface'
import { NumberMonth } from '../types/NumberMonth.type'
import { addDayPerMonth } from './addDayPerMonth'
import { addMonth } from './addMonth'

export function formatTransaction(
	transaction: Transaction,
	formattedStatement: MonthFormattedStatement[],
	setFormattedStatement: (
		value: React.SetStateAction<MonthFormattedStatement[]>
	) => void
) {
	const month: unknown = new Date(transaction.timestamp).getMonth()
	let monthIsNotAdded = true

	addMonth(month, monthIsNotAdded, formattedStatement, setFormattedStatement)

	addDayPerMonth(
		transaction,
		month as NumberMonth,
		formattedStatement,
		setFormattedStatement
	)
}
