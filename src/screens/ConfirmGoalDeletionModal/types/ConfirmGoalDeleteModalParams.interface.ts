import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'

export interface ConfirmGoalDeleteModalParams {
	goal: Goal
	setDateHome: Dispatch<Date>
}
