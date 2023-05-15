import { Dispatch } from 'react'

export interface GoalActionModalParams {
	userId: string
	goalId: string
	type: 'edit' | 'increment' | 'decrement'
	setDate: Dispatch<Date>
	getAvailableBalance?: () => number
	availableIncrement?: number
}
