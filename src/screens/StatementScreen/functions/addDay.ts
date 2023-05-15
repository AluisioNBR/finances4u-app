import { MonthFormattedStatement } from '../types/MonthFormattedStatement.interface'

export function addDay(
	index: number,
	day: number,
	dayIsNotAdded: boolean,
	formattedStatement: MonthFormattedStatement[],
	setFormattedStatement: (
		value: React.SetStateAction<MonthFormattedStatement[]>
	) => void
) {
	if (formattedStatement[index].transactions.length == 0)
		setFormattedStatement((prevState) => {
			prevState[index].transactions.push({ day: day, transactions: [] })
			return prevState
		})
	else {
		formattedStatement[index].transactions.forEach((statement) => {
			if (statement.day == day) dayIsNotAdded = false
		})

		if (dayIsNotAdded)
			setFormattedStatement((prevState) => {
				prevState[index].transactions.push({
					day: day,
					transactions: [],
				})
				return prevState
			})
	}
}
