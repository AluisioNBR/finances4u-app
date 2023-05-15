import { Dispatch } from 'react'

export interface GoalActionModalParams {
	userId: string
	blockId: string
	blockName: string
	blockValue: number
	setDate: Dispatch<Date>
	availableBalance?: number
}
