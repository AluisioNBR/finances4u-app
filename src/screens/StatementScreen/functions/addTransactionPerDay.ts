import { Transaction } from '../../../@types/data/Transaction.interface'
import { MonthFormattedStatement } from '../types/MonthFormattedStatement.interface'

export function addTransactionPerDay(
	index: number,
	day: number,
	transaction: Transaction,
	formattedStatement: MonthFormattedStatement[],
	setFormattedStatement: (
		value: React.SetStateAction<MonthFormattedStatement[]>
	) => void
) {
	for (
		let index2 = 0;
		index2 < formattedStatement[index].transactions.length;
		index2++
	)
		if (formattedStatement[index].transactions[index2].day == day)
			setFormattedStatement((prevState) => {
				prevState[index].transactions[index2].transactions.push(transaction)
				return prevState
			})
}
