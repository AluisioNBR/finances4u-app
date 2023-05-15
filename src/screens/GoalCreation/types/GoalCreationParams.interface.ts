import { Dispatch } from 'react'

export interface GoalCreationParams {
	userId: string
	availableBalance: number
	availableIncrementRate: number
	setDate: Dispatch<Date>
}
