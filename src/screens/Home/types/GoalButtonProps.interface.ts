import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'

export interface GoalButtonProps {
	children: Goal
	incrementRateAvailable: number
	balance: number
	setDate: Dispatch<Date>
}
