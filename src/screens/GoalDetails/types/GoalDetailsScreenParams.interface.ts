import { Dispatch } from 'react'

export interface GoalDetailsScreenParams {
	userId: string
	goalId: string
	balance: number
	setDateHome: Dispatch<Date>
}
