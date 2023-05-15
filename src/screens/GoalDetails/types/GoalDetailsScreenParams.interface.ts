import { Dispatch } from 'react'

export interface GoalDetailsScreenParams {
	userId: string
	goalId: string
	getAvailableBalance: () => number
	setDateHome: Dispatch<Date>
}
