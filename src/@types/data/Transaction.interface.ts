export interface Transaction {
	_id: string

	owner: string

	type: 'Income' | 'Expense'

	name: string

	value: number

	timestamp: Date

	__v: number
}
