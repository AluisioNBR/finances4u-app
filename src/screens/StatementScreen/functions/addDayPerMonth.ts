import { Transaction } from '../../../@types/data/Transaction.interface'
import { MonthFormattedStatement } from '../types/MonthFormattedStatement.interface'
import { NumberMonth } from '../types/NumberMonth.type'
import { addDay } from './addDay'
import { addTransactionPerDay } from './addTransactionPerDay'

export function addDayPerMonth(
	transaction: Transaction,
	month: NumberMonth,
	formattedStatement: MonthFormattedStatement[],
	setFormattedStatement: (
		value: React.SetStateAction<MonthFormattedStatement[]>
	) => void
) {
	for (let index = 0; index < formattedStatement.length; index++) {
		if (formattedStatement[index].month == month) {
			const day = new Date(transaction.timestamp).getDate()
			let dayIsNotAdded = true

			addDay(
				index,
				day,
				dayIsNotAdded,
				formattedStatement,
				setFormattedStatement
			)

			addTransactionPerDay(
				index,
				day,
				transaction,
				formattedStatement,
				setFormattedStatement
			)
		}
	}
}
