import { MonthFormattedStatement } from '../types/MonthFormattedStatement.interface'
import { NumberMonth } from '../types/NumberMonth.type'

export function addMonth(
	month: unknown,
	monthIsNotAdded: boolean,
	formattedStatement: MonthFormattedStatement[],
	setFormattedStatement: (
		value: React.SetStateAction<MonthFormattedStatement[]>
	) => void
) {
	if (formattedStatement.length == 0)
		setFormattedStatement((prevState) => {
			prevState.push({
				month: month as NumberMonth,
				transactions: [],
			})
			return prevState
		})
	else {
		formattedStatement.forEach((statement) => {
			if (statement.month == month) monthIsNotAdded = false
		})

		if (monthIsNotAdded)
			setFormattedStatement((prevState) => {
				prevState.push({
					month: month as NumberMonth,
					transactions: [],
				})
				return prevState
			})
	}
}
