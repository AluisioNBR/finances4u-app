import { DayFormattedStatement } from './DayFormattedStatement.interface'
import { NumberMonth } from './NumberMonth.type'

export interface MonthFormattedStatement {
	month: NumberMonth
	transactions: DayFormattedStatement[]
}
